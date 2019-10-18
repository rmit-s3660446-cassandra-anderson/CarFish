import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  email = this.userService.getCurrentUser().email;
  firstName = this.userService.getCurrentUser().firstName;
  lastName = this.userService.getCurrentUser().lastName;
  
  constructor( 
    private userService: UserService
    
  ) { }

  ngOnInit() {
  }

}
