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
  searchResults: any;
  matchingLocations = [];
  private searchInput = new Subject<string>();
  filteredResults = [];
  resultsError: string;
  datePickerConfig: Partial<BsDatepickerConfig>;

  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
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
        if(!this.matchingLocations.includes(result.location)) {
          this.matchingLocations.push(result.location);
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
      this.filteredResults = this.searchResults.filter((res) => res.location == location);
    }
  }

  filterResultsByDate(startDate: number, endDate: number): void {
    this.filteredResults = this.filteredResults.filter((result) => {
      return (startDate >= Date.parse(result.startDate) && endDate <= Date.parse(result.endDate));
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