import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  private email = this.userService.getCurrentUser().email;
  private firstName = this.userService.getCurrentUser().firstName;
  private lastName = this.userService.getCurrentUser().lastName;
  
  constructor( 
    private userService: UserService
    
  ) { }

  ngOnInit() {
  }

}
