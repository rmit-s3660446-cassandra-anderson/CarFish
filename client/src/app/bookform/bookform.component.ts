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
    this.startDate = new Date(dateRange[0].getFullYear(), dateRange[0].getMonth(), dateRange[0].getDate(),0,0,0,0).getTime();
    this.endDate = new Date(dateRange[1].getFullYear(), dateRange[1].getMonth(), dateRange[1].getDate(),0,0,0,0).getTime();
    this.invalidRange = this.unavailableDates.filter((date) => date > this.startDate && date < this.endDate).length > 0;
  }

  bookCar(): void {
    this.bookingAttempt = true;
    if((!this.startDate && !this.endDate) || (this.invalidRange)) {
      console.log("Not proceeding with booking");
      return;
    }
    this.bookingService.bookCar({
      startDate: this.startDate,
      endDate: this.endDate,
      user: this.userService.getCurrentUser()._id,
      car: this.selectedCar._id
    }).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl('');
    });
  }
}