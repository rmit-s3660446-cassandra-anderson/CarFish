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
}
