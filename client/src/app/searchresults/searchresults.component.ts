import { Component, OnInit, Input } from '@angular/core';
import { CarService } from '../car.service'

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {
  @Input() displayResults: any;
  @Input() resultsError: string;

  constructor(
    private carService: CarService
  ) { }

  ngOnInit() {
  }

  setSelectedCar(selectedCar: any) {
    this.carService.setSelectedCar(selectedCar);
  }

  filterResult(result: any): boolean {
    if(this.displayResults.filterBy.doors && result.type.doors != this.displayResults.filterBy.doors) {
      return true;
    }
    if(this.displayResults.filterBy.brand && result.type.brand != this.displayResults.filterBy.brand) {
      return true;
    }
    if(this.displayResults.filterBy.transmission && result.type.transmission != this.displayResults.filterBy.transmission) {
      return true;
    }
    return false;
  }
}
