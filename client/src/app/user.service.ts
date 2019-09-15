import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = 'http://localhost:9000/users';

  currentUser: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  login(loginDetails: Object): Observable<any> {
    const url = `${this.userURL}/login`;
    return this.http.post<any>(url, loginDetails, this.httpOptions);
  }

  signup(signupDetails: Object): Observable<any> {
    const url = `${this.userURL}/signup`;
    return this.http.post<any>(url, signupDetails, this.httpOptions);
  }

  setCurrentUser(username: string): void {
    this.currentUser = username;
    console.log(this.currentUser);
  }

  getCurrentUser(): string {
    console.log("user service getuser");
    console.log(this.currentUser);
    return this.currentUser;
  }
}
