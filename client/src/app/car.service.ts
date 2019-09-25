import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private carURL = 'http://localhost:9000/cars';
  selectedCar: any;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  carSearch(input: string): Observable<any> {
    console.log("Car service search");
    return this.http.get<any>(`${this.carURL}/${input}`)
  }

  setSelectedCar(selectedCar: any): void {
    this.selectedCar = selectedCar;
  }

  getSelectedCar(): any {
    return this.selectedCar;
  }

  register(registerDetails: Object): Observable<any> {
    const url = `${this.carURL}/create`;
    return this.http.post<any>(url, registerDetails, this.httpOptions);
  }
}
