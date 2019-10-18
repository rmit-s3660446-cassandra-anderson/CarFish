import {} from "googlemaps";
import { Component, OnInit, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { MapsService } from '../maps.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() displayResults: any;

  // the starting location will be the Location
  // grabbed from the user's IP address
  latitude: any;
  longitude: any;
  // this is how zoomed in the map starts at
  zoom = 6;

  location: any;

  selectedMarker;
  service: any;

  // stores the coordinates and the car info
  // associated with each point
  markers = [];

  addMarker(location: any, info: any) {
    this.markers.push({lat: location.lat(), lng: location.lng(), info: info});
  }

  resetMarkers() {
    this.markers = [];
  }

  constructor(private map: MapsService) { }

  ngOnInit() {
    this.service = new google.maps.places.PlacesService(document.createElement('div'));
    this.map.getLocation().subscribe(data => {
      console.log(data);
      this.latitude = data.latitude;
      this.longitude = data.longitude;
    });
    this.setCurrentPosition();
  }

  /* Whenever the user searches, the new search results gets passed
     through to here */
  ngOnChanges(changes: SimpleChanges) {
    console.log("changes", changes.displayResults.currentValue);
    // clears the current markers off the map
    this.markers = [];
    changes.displayResults.currentValue.forEach((result) => {
      var request = {
        query: result.location.street + ", " + result.location.suburb,
        fields: ['name', 'geometry'],
      };

      var info = {
        location: result.location.street + ", " + result.location.suburb,
        car: result.type.year + " " + result.type.brand + " " + result.type.model,
      };
      console.log("the result", result);

      // this is calling the places api and finding the location based on
      // the street and suburb
      this.service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            this.addMarker(results[i].geometry.location, info);
          }
          // sets where the map is looking
          this.latitude = results[0].geometry.location.lat();
          this.longitude = results[0].geometry.location.lng();
          this.zoom = 14;
        }
      });
    });
  }

  setCurrentPosition() {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

}
