import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CookieStorage, LocalStorage, SharedStorage, SessionStorage } from 'ngx-store';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public accountPage = true;
  public registerCar = false;
  public activityHistory = false;
  private gravatar: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.gravatar = this.getCurrentUser().username + "@carfish.com"
  }

  public showAccount(){
    this.accountPage = true;
    this.registerCar = false;
    this.activityHistory = false;
  }
  public showRegisterCar(){
    this.accountPage = false;
    this.registerCar = true;
    this.activityHistory = false;
  }
  public showActivityHistory(){
    this.accountPage = false;
    this.registerCar = false;
    this.activityHistory = true;
  }

  getCurrentUser(): any {
    return this.userService.getCurrentUser();
  }
  getGravatar(): string {
    return this.gravatar;
  }
}
