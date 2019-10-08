/// <reference types="googlemaps" />
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CarService } from '../car.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
//import { } from '@types/googlemaps'

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchBarComponent implements OnInit {
  // to get the google autocomplete to work
  @Input() addressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addressText') addressText: any;
  autocompleteInput: string;

  // to get the normal autofill to work
  @ViewChild('searchLocation', {static: false}) searchLocation: ElementRef;
  searchResults: any;
  matchingLocations = [];
  private searchInput = new Subject<any>();
  filteredResults = [];
  resultsError: string;
  datePickerConfig: Partial<BsDatepickerConfig>;

  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.datePickerConfig = { containerClass: 'theme-dark-blue' };
  }

  /* as the user types in a location, google autofills it.
    when the user selects a location from the list, the Object
    that contains the location's details is returned and passed
    to the CarService where a list of cars in that area are generated
    */
  ngAfterViewInit() {
    this.carService.carSearch(this.getPlaceAutocomplete()['formatted_address']).subscribe((results) => {
      console.log(results);
      this.matchingLocations = [];
      results.forEach((result) => {
        if(!this.matchingLocations.includes(result.location.suburb)) {
          this.matchingLocations.push(result.location.suburb);
        }
      })
      console.log(this.searchInput);
      this.searchResults = results;
    });
  }

  // This is google generating a list of places that the user may be typing in
  getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addressText.nativeElement,
    {
      componentRestrictions: { country: 'AU' }, //restricting the search range to Australia
      types: [this.addressType] // can modify how detailed the address is
    });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
      return place;
    });
    //var place = autocomplete.getPlace();
}

  // Push a search term into the observable stream.
  invokeEvent(place: Object) {
    this.setAddress.emit(place);
    console.log(place);
  }

  validateSearch(dateRange: string, location: string): void {
    this.resetValues();
    this.filterResultsByLocation(location);

    if (!this.searchResults || this.filteredResults.length == 0) {
      this.resultsError = "No cars in that location! Please try another."
      return;
    } else if(dateRange == "") {
      return;
    }

    let startDate = Date.parse(dateRange.split(" ")[0]);
    let endDate = Date.parse(dateRange.split(" ")[2]);
    this.filterResultsByDate(startDate, endDate);

    if (this.filteredResults.length == 0) {
      this.resultsError = "No cars available in that date range!  Please try another."
    }
  }

  filterResultsByLocation(location: string): void {
    if(this.searchResults) {
      this.filteredResults = this.searchResults.filter((res) => res.location.suburb == location);
    }
  }

  filterResultsByDate(startDate: number, endDate: number): void {
    this.filteredResults = this.filteredResults.filter((result) => {
      return (startDate <= Date.parse(result.startDate) && endDate >= Date.parse(result.endDate));
    });
  }

  selectLocation(location: string): void {
    this.matchingLocations = [];
    this.searchLocation.nativeElement.value = location;
  }

  resetValues(): void {
    this.filteredResults = [];
    this.resultsError = "";
    this.matchingLocations = [];
  }
}
