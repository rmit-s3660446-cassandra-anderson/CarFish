import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  appTitle: string = 'Carfish';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() { }

  getCurrentUser(): string {
    return this.userService.getCurrentUser();
  }

  logout(): void {
    this.userService.setCurrentUser("");
  }
}


