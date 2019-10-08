/* A service that allows the map to connect to an external API
  that grabs the user's IP address and it's location */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Location {
  latitude: string;
  longitude: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }

  getLocation() {
    return this.http.get<Location>('http://api.ipapi.com/api/check?access_key=645b3221d8f6d813bb0c791bbf968678');
  }

}
