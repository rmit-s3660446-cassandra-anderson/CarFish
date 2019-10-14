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
  @ViewChild('brandFilter', {static: false}) brandFilter: ElementRef;
  @ViewChild('doorsFilter', {static: false}) doorsFilter: ElementRef;
  @ViewChild('transmissionFilter', {static: false}) transmissionFilter: ElementRef;
  @ViewChild('priceFilter', {static: false}) priceFilter: ElementRef;
  searchResults: any;
  matchingLocations = [];

  private searchInput = new Subject<any>();
  filteredResults = {
    results: [],
    filterBy: {
      doors: "",
      brand: "",
      transmission: ""
    }
  };

  resultsError: string;
  datePickerConfig: Partial<BsDatepickerConfig>;
  filters = {
    doors: [],
    brand: [],
    transmission: []
  }

  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    // display all cars on load
    this.carService.getAllCars()
      .subscribe((res) => {
        this.filteredResults.results = res
        this.populateDropDownFilters();
      });

    this.datePickerConfig = { containerClass: 'theme-dark-blue' };

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

    if (!this.searchResults || this.filteredResults.results.length == 0) {
      this.resultsError = "No cars in that location! Please try another."
      return;
    } else if(dateRange == "") {
      this.populateDropDownFilters();
      return;
    }

    let startDate = Date.parse(dateRange.split(" ")[0]);
    let endDate = Date.parse(dateRange.split(" ")[2]);
    this.filterResultsByDate(startDate, endDate);

    if (this.filteredResults.results.length == 0) {
      this.resultsError = "No cars available in that date range!  Please try another."
    }

    this.populateDropDownFilters();
  }

  filterResultsByLocation(location: string): void {
    if(this.searchResults) {
      this.filteredResults.results = this.searchResults.filter((res) => res.location.suburb == location);
    }
  }

  filterResultsByDate(startDate: number, endDate: number): void {
    this.filteredResults.results = this.filteredResults.results.filter((result) => {
      return (startDate <= Date.parse(result.startDate) && endDate >= Date.parse(result.endDate));
    });
  }

  selectLocation(location: string): void {
    this.matchingLocations = [];
    this.searchLocation.nativeElement.value = location;
  }

  populateDropDownFilters(): void {
    this.filteredResults.results.forEach((res) => {
      if(!this.filters.brand.includes(res.type.brand)) {
        this.filters.brand.push(res.type.brand);
      }
      if(!this.filters.doors.includes(res.type.doors)) {
        this.filters.doors.push(res.type.doors);
      }
      if(!this.filters.transmission.includes(res.type.transmission)) {
        this.filters.transmission.push(res.type.transmission);
      }
    });
  }

  filterBy(type: string, event: any): void {
    console.log("filterBy");
    console.log(type);
    console.log(event.target.value);
    let filter = event.target.value;
    this.filteredResults.filterBy[type] = filter;
  }

  orderByPrice(event: any): void {
    let order = event.target.value;
    if(order == "highest") {
      this.filteredResults.results.sort(function(a,b) {
        return parseInt(a.rate) - parseInt(b.rate);
      }).reverse();
    } else if(order == "lowest") {
      this.filteredResults.results.sort(function(a,b) {
        return parseInt(a.rate) - parseInt(b.rate);
      });
    }
  }

  resetValues(): void {
    this.filteredResults.results = [];
    this.resultsError = "";
    this.matchingLocations = [];
    Object.keys(this.filters).forEach((filter) => this.filters[filter] = []);
    Object.keys(this.filteredResults.filterBy).forEach((filter) => this.filteredResults.filterBy[filter] = "");
    this.brandFilter.nativeElement.value = '';
    this.doorsFilter.nativeElement.value = '';
    this.transmissionFilter.nativeElement.value = '';
    this.priceFilter.nativeElement.value = '-';
  }
}
