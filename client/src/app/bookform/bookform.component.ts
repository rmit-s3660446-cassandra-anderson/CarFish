import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { CarService } from '../car.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-bookform',
  templateUrl: './bookform.component.html',
  styleUrls: ['./bookform.component.css']
})
export class BookformComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  unavailableDates = [];
  invalidRange = false;
  selectedCar: any;
  startDate: any;
  endDate: any;
  bookingAttempt = false;
  bookingDetails: any;
  errorMessage = "";

  constructor(
    private bookingService: BookingService,
    private carService: CarService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    if(!this.userService.getCurrentUser()) {
      this.router.navigateByUrl('login');
    }
    let car = this.selectedCar = this.carService.getSelectedCar();
    this.bookingService.getUnavailableDates(car._id)
      .subscribe((unavailableDates) => {
        console.log(unavailableDates);
        this.unavailableDates = unavailableDates;
        this.datePickerConfig = {
          containerClass: 'theme-dark-blue',
          minDate: new Date(car.startDate),
          maxDate: new Date(car.endDate),
          datesDisabled: this.convertToDateFormat(unavailableDates)
        };
      });
  }

  convertToDateFormat(unavailableDates: number[]): any {
    return unavailableDates.map((date) => {
      return new Date(date);
    });
  }

  validateDateRange(dateRange: Date[]): void {
    this.bookingAttempt = true;

    this.startDate = new Date(dateRange[0].getFullYear(), dateRange[0].getMonth(), dateRange[0].getDate(),0,0,0,0);

    this.endDate = new Date(dateRange[1].getFullYear(), dateRange[1].getMonth(), dateRange[1].getDate(),0,0,0,0);

    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.getDays());
    console.log(this.selectedCar.maxLength);

    if(this.getDays() > parseInt(this.selectedCar.maxLength)) {
      this.invalidRange = true;
      this.errorMessage = "Can't book for that long!"
      return;
    }

    this.invalidRange = this.unavailableDates.filter((date) => date > this.startDate && date < this.endDate).length > 0;

    if(!this.invalidRange) {
      this.bookingDetails = {
        startDate: this.startDate,
        endDate: this.endDate,
        cost: this.getTotalCost(),
        user: this.userService.getCurrentUser()._id,
        car: this.selectedCar._id
      }
    } else {
      this.errorMessage = "Already a booking during that time!";
    }
  }

  getTotalCost(): number {
    return this.getDays() * this.selectedCar.rate;
  }

  getDays(): number {
    return Math.floor((Date.UTC(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate()) - Date.UTC(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate()) ) /(1000 * 60 * 60 * 24));
  }
}