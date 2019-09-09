import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // we must hard code the starting coordinates
  // the starting point atm is London
  latitude = 51.508742;
  longitude = -0.120850;

  selectedMarker;

  // something to store an InfoWindow in
  info;

  markers = [
    {lat: 51.508742, lng: -0.420000, mess: "Hello, I am a point"},
    {lat: -0.120850, lng: 51.508742, mess: "Welcome to a point"}
  ];

  // adds a marker at the coordinates
  addMarker(lat: number, lng: number, mess: string){
    this.markers.push({lat,lng,mess});
  }

  findMess(lat, lng){
    var mess = "";
    var i;
    console.log(lat + " " + lng);
    for (i = 0; i < this.markers.length; i++){
      if (lat === this.markers[i].lat && lng === this.markers[i].lng){
        console.log(this.markers[i].mess);
        mess = this.markers[i].mess;
      }
    }
    return mess;
  }

  selectMarker(event){
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude,
      info: this.findMess(event.latitude, event.longitude)
    };
    console.log(this.info);
  }

  constructor() { }

  ngOnInit() {
  }

}
