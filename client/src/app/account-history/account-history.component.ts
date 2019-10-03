import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { CarService } from '../car.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-history',
  templateUrl: './account-history.component.html',
  styleUrls: ['./account-history.component.css']
})
export class AccountHistoryComponent implements OnInit {
  bookedCars = [];
  addedCars = [];

  constructor(
    private bookingService: BookingService,
    private carService: CarService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.carService.getCarsByUser(this.userService.getCurrentUser()._id)
      .subscribe((addedCars) => this.addedCars = addedCars);
    this.bookingService.getBookingsByUser(this.userService.getCurrentUser()._id)
      .subscribe((bookedCars) => this.bookedCars = bookedCars);
  }

  getTotalCost(start: string, end: string, rate: string): number {
    let d1 = new Date(start);
    let d2 = new Date(end);
    return Math.floor((Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate()) - Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate()) ) /(1000 * 60 * 60 * 24)) * parseInt(rate);
  }
}
