import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingURL = 'https://carfish-api.herokuapp.com/bookings';
  bookedCar: any;

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

  markCarAsReturned(booking: string): Observable<any> {
    return this.http.put<any>(`${this.bookingURL}`, {id: booking}, this.httpOptions);
  }

  setBookedCar(bookedCar: any): void {
    this.bookedCar = bookedCar;
  }

  getBookedCar(): any {
    return this.bookedCar;
  }
}
