import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingURL = 'http://localhost:9000/bookings';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getUnavailableDates(car: string): Observable<any> {
    return this.http.get<any>(`${this.bookingURL}/dates/${car}`);
  }

  bookCar(bookingDetails: Object): Observable<any> {
    const url = `${this.bookingURL}`;
    return this.http.post<any>(url, bookingDetails, this.httpOptions);
  }

  getBookingsByUser(user: string): Observable<any> {
    return this.http.get<any>(`${this.bookingURL}/?user=${user}`)
  }

  getBookingsByCar(car: string): Observable<any> {
    return this.http.get<any>(`${this.bookingURL}/?car=${car}`)
  }
}
