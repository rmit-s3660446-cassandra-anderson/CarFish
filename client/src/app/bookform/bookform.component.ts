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
    let startDate = dateRange[0].getTime();
    let endDate = dateRange[1].getTime();
    this.unavailableDates.forEach((date) => {
      if(date > startDate && date < endDate) {
        this.invalidRange = true;
        return;
      }
    });
  }

  reset(): void {
    this.invalidRange = false;
  }
}