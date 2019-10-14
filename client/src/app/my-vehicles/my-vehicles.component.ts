import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-vehicles',
  templateUrl: './my-vehicles.component.html',
  styleUrls: ['./my-vehicles.component.css']
})
export class MyVehiclesComponent implements OnInit {
  addedCars = [];
  selectedCar: any;
  constructor(
    private carService: CarService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.carService.getCarsByUser(this.userService.getCurrentUser()._id)
      .subscribe((addedCars) => this.addedCars = addedCars);
  }

  setCarAsUnlisted(car: any): void {
  //this is going to require the schema to be updated and an 'update status' function added to the .ts
  }
}
