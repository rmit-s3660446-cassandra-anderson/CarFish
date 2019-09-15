import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() { }

  getCurrentUser(): string {
    console.log("Get current user");
    console.log(this.userService.getCurrentUser());
    return this.userService.getCurrentUser();
  }
}
