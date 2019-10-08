import { Component, OnInit } from '@angular/core';
import { MapsService } from '../maps.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // the starting location will be the Location
  // grabbed from the user's IP address
  latitude: any;
  longitude: any;

  location: any;

  selectedMarker;

  // stores the coordinates and the car info
  // associated with each point
  markers = [];
  /*  { lat: 51.508742,
      lng: -0.420000,
      item: {
        carName: "Toyota Corolla",
        style: "hatchback",
        costph: 24
      }
    },
    { lat: -0.120850,
      lng: 51.508742,
      item: {
        carName: "Honda Civic",
        style: "sedan",
        costph: 15
      }
    },
    { lat: 42.120850,
      lng: 50.508742,
      item: {
        carName: "Hyundai Getz",
        style: "sedan",
        costph: 20
      }
    },
    { lat: -51.414131,
      lng: -0.4214123,
      item: {
        carName: "Toyota Camry",
        style: "hatchback",
        costph: 28
      }
    },
    { lat: 60.414131,
      lng: 60.4214123,
      item: {
        carName: "Range Rover",
        style: "sedan",
        costph: 28
      }
    },
    { lat: -60.414131,
      lng: -60.4214123,
      item: {
        carName: "Holden Mustang",
        style: "sedan",
        costph: 50
      }
    }
  ];

  // adds a marker at the coordinates
  addMarker(lat: number, lng: number, item: any){
    this.markers.push({lat,lng,item});
  }

  // since the coordinates are assumed to be unique
  // they can be used to find the associated car
  findItem(lat, lng){
    var item;
    var i;
    console.log(lat + " " + lng);
    for (i = 0; i < this.markers.length; i++){
      if (lat === this.markers[i].lat && lng === this.markers[i].lng){
        console.log(this.markers[i].item);
        item = this.markers[i].item;
      }
    }
    return item;
  } */

  constructor(private map: MapsService) { }

  ngOnInit() {
    this.map.getLocation().subscribe(data => {
      console.log(data);
      this.latitude = data.latitude;
      this.longitude = data.longitude;
    });
    this.setCurrentPosition();
  }

  setCurrentPosition() {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

  /*selectMarker(event){
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude,
      info: this.findItem(event.latitude, event.longitude)
    };
  }*/

}
