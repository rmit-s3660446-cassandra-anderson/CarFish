import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CarService } from '../car.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchBarComponent implements OnInit {
  @ViewChild('searchLocation', {static: false}) searchLocation: ElementRef;
  @ViewChild('brandFilter', {static: false}) brandFilter: ElementRef;
  @ViewChild('doorsFilter', {static: false}) doorsFilter: ElementRef;
  @ViewChild('transmissionFilter', {static: false}) transmissionFilter: ElementRef;
  @ViewChild('priceFilter', {static: false}) priceFilter: ElementRef;
  searchResults: any;
  matchingLocations = [];
  private searchInput = new Subject<string>();
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
      .subscribe((res) => this.filteredResults.results = res);

    this.datePickerConfig = { containerClass: 'theme-dark-blue' };

    this.searchInput.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((input: string) => this.carService.carSearch(input)),
    ).subscribe((results) => {
      this.matchingLocations = [];
      results.forEach((result) => {
        if(!this.matchingLocations.includes(result.location.suburb)) {
          this.matchingLocations.push(result.location.suburb);
        }
      })
      this.searchResults = results;
    });
  }

  // Push a search term into the observable stream.
  search(input: string): void {
    this.searchInput.next(input);
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

  filterBy(type: string, filter: string): void {
    this.filteredResults.filterBy[type] = filter;
  }

  orderByPrice(order: string): void {
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
    this.brandFilter.nativeElement.value = 'All';
    this.doorsFilter.nativeElement.value = 'All';
    this.transmissionFilter.nativeElement.value = 'All';
    this.priceFilter.nativeElement.value = '-';
  }
}