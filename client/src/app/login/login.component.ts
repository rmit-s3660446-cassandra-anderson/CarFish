import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CookieStorage, LocalStorage, SharedStorage, SessionStorage } from 'ngx-store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @SharedStorage() loggedUsername: String = '';
  @SharedStorage() loggedFirst: String = '';
  @SharedStorage() loggedLast: String = '';
  @SharedStorage() loggedEmail: String = '';


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
    this.loginAttempt = true;
    if(this.validateUserInput()) {
      this.userService.login(this.loginDetails)
        .subscribe(res => this.validateLogin(res));
        this.loggedUsername = this.loginDetails.username;
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
    this.loginAttempt = false;
    this.loginFailed = false;
  }
}
