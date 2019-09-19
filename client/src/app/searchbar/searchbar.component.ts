import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CarService } from '../car.service'

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchBarComponent implements OnInit {
  @ViewChild('searchLocation', {static: false}) searchLocation: ElementRef;
  searchResults: any;
  matchingLocations = []
  private searchInput = new Subject<string>();
  finalResults = []

  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
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

  displayResults(startDate: string, endDate: string): void {
    let userStartDate = Date.parse(startDate);
    let userEndDate = Date.parse(endDate);
    // if the end date is less than the start, return
    if(userEndDate < userStartDate) {
      console.log("End less than start");
      return;
    }
    this.searchResults.forEach((result) => {
      console.log(result);
      console.log(Date.parse(result.startDate));
      console.log(Date.parse(result.endDate));
      if(userStartDate >= Date.parse(result.startDate) &&
      userEndDate <= Date.parse(result.endDate)) {
        console.log(result);
        this.finalResults.push(result);
      }
    });
  }

  selectLocation(location: string): void {
    this.matchingLocations = [];
    this.searchLocation.nativeElement.value = location;
  }
}
