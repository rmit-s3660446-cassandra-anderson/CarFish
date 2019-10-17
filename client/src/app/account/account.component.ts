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
    this.router.navigateByUrl('account/details');
  }
  public showMyVehicles(){
    this.router.navigateByUrl('account/myvehicles');
  }
  public showRegisterCar(){
    this.router.navigateByUrl('account/registercar');
  }
  public showActivityHistory(){
    this.router.navigateByUrl('account/history');
  }

  getCurrentUser(): any {
    return this.userService.getCurrentUser();
  }
  getGravatar(): string {
    return this.gravatar;
  }
}
