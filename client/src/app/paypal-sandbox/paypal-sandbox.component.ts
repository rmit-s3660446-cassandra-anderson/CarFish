import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { UserService } from '../user.service';
import { CarService } from '../car.service';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paypal-sandbox',
  templateUrl: './paypal-sandbox.component.html',
  styleUrls: ['./paypal-sandbox.component.css']
})
export class PaypalSandboxComponent implements OnInit {
  @Input() bookingDetails: any;
  public payPalConfig?: IPayPalConfig;

  constructor(
    private bookingService: BookingService,
    private carService: CarService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.payPalConfig = {
      currency: 'AUD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'AUD',
            value: this.bookingDetails.cost.toString()
          }
        }],
        payer: {
          name: {
            given_name: this.userService.getCurrentUser().firstName,
            surname: this.userService.getCurrentUser().lastName
          },
          email_address: this.userService.getCurrentUser().email
        },
        application_context: {
          landing_page: 'BILLING',
          brand_name: 'Carfish',
        },
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details) => {
          this.bookCar();
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        alert('Booking cancelled, no payment was made.');
      },
      onError: err => {
        console.log('OnError', err);
        alert('Booking error, payment was not made.');
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  bookCar(): void {
    this.bookingService.bookCar(this.bookingDetails)
      .subscribe((res) => {
        console.log(res);
        this.router.navigateByUrl('account/details');
      });
  }
}