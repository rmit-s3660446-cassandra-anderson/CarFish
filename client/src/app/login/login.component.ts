import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDetails = {
    username: "",
    password: ""
  };

  loginAttempt = false;

  loginFailed = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(): void {
    console.log("login");
    console.log(this.validateUserInput());
    this.loginAttempt = true;
    if(this.validateUserInput()) {
      this.userService.login(this.loginDetails)
        .subscribe(res => this.validateLogin(res));
    }
  }

  validateUserInput(): boolean {
    return Object.values(this.loginDetails).filter(detail => detail == "").length == 0
  }

  validateLogin(res: any): void {
    if(Object.keys(res).length > 0) {
      this.userService.setCurrentUser(res.username);
      this.router.navigateByUrl('');
    } else {
      this.loginFailed = true;
    }
  }

  resetErrors(): void {
    console.log("Reset errors");
    this.loginAttempt = false;
    this.loginFailed = false;
  }
}
