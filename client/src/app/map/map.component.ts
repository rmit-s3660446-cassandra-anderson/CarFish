/// <reference types="googlemaps" />
import { Component, OnInit, Input, OnChanges, SimpleChanges  } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {

  @Input() displayResults: any;

  // we must hard code the starting coordinate and a specified zoom
  mapLatitude = 0;
  mapLongitude = 0;
  zoom = 6;

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

  constructor() { }

  ngOnInit() {
    this.service = new google.maps.places.PlacesService(document.createElement('div'));
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
          this.mapLatitude = results[0].geometry.location.lat();
          this.mapLongitude = results[0].geometry.location.lng();
          this.zoom = 14;
        }
      });
    });
  }

}
