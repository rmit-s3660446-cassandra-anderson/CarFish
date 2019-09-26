import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CookieStorage, LocalStorage, SessionStorage } from 'ngx-store';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  appTitle: string = 'Carfish';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() { }

  getCurrentUser(): any {
    return this.userService.getCurrentUser();
  }

  logout(): void {
    this.userService.setCurrentUser("");
    this.router.navigateByUrl('');
  }
}


