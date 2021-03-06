import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcarform',
  templateUrl: './addcarform.component.html',
  styleUrls: ['./addcarform.component.css']
})
export class AddcarformComponent implements OnInit {

  signupDetails = {
    type: {
      brand: "",
      model: "",
      year: "",
      doors: "",
      transmission: ""
    },
    location: {
      suburb: "",
      street: ""
    },
    rate: "",
    startDate: "",
    endDate: "",
    maxLength: "",
    user: this.userService.getCurrentUser()._id,
    userNotes: ""
  };

  signupAttempt = false;

  signupFailed = false;

  constructor(
    private carService: CarService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register(): void {
    this.signupAttempt = true;
    if(this.validateUserInput()) {
      this.carService.register(this.signupDetails)
        .subscribe(res => this.validateSignup(res));
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
