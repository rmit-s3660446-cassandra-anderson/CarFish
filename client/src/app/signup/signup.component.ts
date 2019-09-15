import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
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
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signup(): void {
    console.log("signup");
    console.log(this.validateUserInput());
    this.signupAttempt = true;
    if(this.validateUserInput()) {
      this.userService.signup(this.signupDetails)
        .subscribe(res => this.validateSignup(res));
    }
  }

  validateUserInput(): boolean {
    return Object.values(this.signupDetails).filter(detail => detail == "").length == 0
  }

  validateSignup(res: any): void {
    if(Object.keys(res).length > 0) {
      this.userService.setCurrentUser(res.username);
      this.router.navigateByUrl('');
    } else {
      this.signupFailed = true;
    }
  }

  resetErrors(): void {
    console.log("Reset errors");
    this.signupAttempt = false;
    this.signupFailed = false;
  }
}
