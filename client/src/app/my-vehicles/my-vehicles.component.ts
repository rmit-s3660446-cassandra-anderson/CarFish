import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { BookingService } from '../booking.service';
import { CarService } from '../car.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-vehicles',
  templateUrl: './my-vehicles.component.html',
  styleUrls: ['./my-vehicles.component.css']
})
export class MyVehiclesComponent implements OnInit {
  addedCars = [];
  selectedCar: any;
  bookingInfo: any;
  bookingTotal = 0;
  @ViewChild('bookingModal', {static: false}) bookingModal: ElementRef;
  @ViewChild('carModal', {static: false}) carModal: ElementRef;

  constructor(
    private carService: CarService,
    private userService: UserService,
    private bookingService: BookingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carService.getCarsByUser(this.userService.getCurrentUser()._id)
      .subscribe((addedCars) => this.addedCars = this.displayListedCars(addedCars));
  }

  setCarAsUnlisted(car: any): void {
    this.carService.unlistCar(car._id)
      .subscribe((res) => {
        console.log(res);
        this.addedCars = this.addedCars.filter((car) => car._id != res._id);
      });
  }

  displayListedCars(addedCars: any): any {
    addedCars = addedCars.filter((car) => car.status == "Listed");
    console.log(addedCars);
    return addedCars;
  }

  displayCurrentBookings(bookings: any): any {
    bookings = bookings.filter((booking) => booking.status != "Returned");
    this.getBookingTotal(bookings);
    return bookings;
  }

  getBookingTotal(bookings: any): void {
    this.bookingTotal = 0;
    bookings.forEach((booking) => {
      this.bookingTotal += parseInt(booking.cost);
    });
  }

  displayBookingModal(car: any): void {
    this.bookingService.getBookingsByCar(car._id)
      .subscribe((bookings) => {
        this.bookingInfo = this.displayCurrentBookings(bookings);
        this.bookingModal.nativeElement.style.display = "block";
      });
  }

  displayCarModal(car: any): void {
    this.selectedCar = car;
    this.carModal.nativeElement.style.display = "block";
  }

  markCarAsReturned(booking: any): void {
    this.bookingService.markCarAsReturned(booking)
      .subscribe((res) => this.bookingInfo = this.displayCurrentBookings(res));
  }

  closeBookingModal(): void {
    this.bookingInfo = "";
    this.bookingModal.nativeElement.style.display = "none";
  }

  closeCarModal(): void {
    this.selectedCar = "";
    this.carModal.nativeElement.style.display = "none";
  }
}
