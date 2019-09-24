import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcarform',
  templateUrl: './addcarform.component.html',
  styleUrls: ['./addcarform.component.css']
})
export class AddcarformComponent implements OnInit {
  signupDetails = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    ccNumber: "",
    csv: "",
    licenseNumber: ""
  };

  signupAttempt = false;

  signupFailed = false;

  constructor(
    private carService: CarService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signup(): void {
    this.signupAttempt = true;
    if(this.validateUserInput()) {

    }
  }

  validateUserInput(): boolean {
    return Object.values(this.signupDetails).filter(detail => detail == "").length == 0
  }

  validateSignup(res: any): void {
    if(Object.keys(res).length > 0) {
      this.router.navigateByUrl('');
    } else {
      this.signupFailed = true;
    }
  }

  resetErrors(): void {
    this.signupAttempt = false;
    this.signupFailed = false;
  }

}
