import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
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
  selectedCar: any;
  bookingInfo: any;
  @ViewChild('carModal', {static: false}) carModal: ElementRef;
  @ViewChild('bookingModal', {static: false}) bookingModal: ElementRef;

  constructor(
    private bookingService: BookingService,
    private carService: CarService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.carService.getCarsByUser(this.userService.getCurrentUser()._id)
      .subscribe((addedCars) => this.addedCars = addedCars);
    this.getBookingsByUser();
  }

  getBookingsByUser(): void {
    this.bookingService.getBookingsByUser(this.userService.getCurrentUser()._id)
      .subscribe((bookedCars) => this.bookedCars = bookedCars);
  }

  displayCarModal(car: any): void {
    this.selectedCar = car;
    this.carModal.nativeElement.style.display = "block";
  }

  closeCarModal(): void {
    this.selectedCar = "";
    this.carModal.nativeElement.style.display = "none";
  }

  displayBookingModal(car: any): void {
    this.bookingService.getBookingsByCar(car._id)
      .subscribe((bookings) => {
        this.bookingInfo = bookings;
        this.bookingModal.nativeElement.style.display = "block";
      });
  }

  closeBookingModal(): void {
    this.bookingInfo = "";
    this.bookingModal.nativeElement.style.display = "none";
  }
}
