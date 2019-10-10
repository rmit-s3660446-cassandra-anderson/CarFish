import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CookieStorage, LocalStorage, SharedStorage, SessionStorage } from 'ngx-store';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public accountPage = true;
  public myVehicles = false;
  public registerCar = false;
  public activityHistory = false;
  private gravatar: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    if(!this.userService.getCurrentUser()) {
      this.router.navigateByUrl('login');
    }
    this.gravatar = this.getCurrentUser().username + "@carfish.com"
  }

  public showAccount(){
    this.accountPage = true;
    this.registerCar = false;
    this.activityHistory = false;
    this.myVehicles = false;
  }
  public showMyVehicles(){
    this.accountPage = false;
    this.registerCar = false;
    this.activityHistory = false;
    this.myVehicles = true;
  }
  public showRegisterCar(){
    this.accountPage = false;
    this.registerCar = true;
    this.activityHistory = false;
    this.myVehicles = false;
  }
  public showActivityHistory(){
    this.accountPage = false;
    this.registerCar = false;
    this.activityHistory = true;
    this.myVehicles = false;
  }

  getCurrentUser(): any {
    return this.userService.getCurrentUser();
  }
  getGravatar(): string {
    return this.gravatar;
  }
}
