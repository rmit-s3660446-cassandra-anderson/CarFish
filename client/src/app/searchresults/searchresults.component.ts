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
}
