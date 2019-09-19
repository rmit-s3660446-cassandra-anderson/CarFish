import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CarService } from '../car.service'

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchResults: any;
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
      this.searchResults = results;
    });
  }

  // Push a search term into the observable stream.
  search(input: string): void {
    this.searchInput.next(input);
  }

  submitResult(location: string): void {
    this.searchResults.forEach((result) => {
      if(result.location == location) {
        this.finalResults.push(result);
      }
    });
  }
}
