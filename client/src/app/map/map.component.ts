import { Component, OnInit, Input, OnChanges, SimpleChanges  } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {

  @Input() displayResults: any;

  // we must hard code the starting coordinates
  // the starting point atm is London
  latitude = 51.508742;
  longitude = -0.120850;

  selectedMarker;
  service: any;

  // stores the coordinates and the car info
  // associated with each point
  markers = [
    // { lat: 51.508742,
    //   lng: -0.420000,
    //   item: {
    //     carName: "Toyota Corolla",
    //     style: "hatchback",
    //     costph: 24
    //   }
    // },
    // { lat: -0.120850,
    //   lng: 51.508742,
    //   item: {
    //     carName: "Honda Civic",
    //     style: "sedan",
    //     costph: 15
    //   }
    // },
    // { lat: 42.120850,
    //   lng: 50.508742,
    //   item: {
    //     carName: "Hyundai Getz",
    //     style: "sedan",
    //     costph: 20
    //   }
    // },
    // { lat: -51.414131,
    //   lng: -0.4214123,
    //   item: {
    //     carName: "Toyota Camry",
    //     style: "hatchback",
    //     costph: 28
    //   }
    // },
    // { lat: 60.414131,
    //   lng: 60.4214123,
    //   item: {
    //     carName: "Range Rover",
    //     style: "sedan",
    //     costph: 28
    //   }
    // },
    // { lat: -60.414131,
    //   lng: -60.4214123,
    //   item: {
    //     carName: "Holden Mustang",
    //     style: "sedan",
    //     costph: 50
    //   }
    // }
  ];

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
  }

  selectMarker(event){
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude,
      info: this.findItem(event.latitude, event.longitude)
    };
  }

  addMarker(location: any) {
    this.markers.push({lat: location.lat(), lng: location.lng()});
  }

  constructor() { }

  ngOnInit() {
    this.service = new google.maps.places.PlacesService(document.createElement('div'));
  }

  /* Whenever the user searches, the new search results gets passed
     through to here */
  ngOnChanges(changes: SimpleChanges) {
    console.log("changes");
    console.log(changes.displayResults.currentValue);
    changes.displayResults.currentValue.forEach((result) => {
      var request = {
        query: result.location.street + "," + result.location.suburb,
        fields: ['name', 'geometry'],
      };

      // this is calling the places api and finding the location based on
      // the street and suburb
      this.service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            this.addMarker(results[i].geometry.location);
          }
          // map.setCenter(results[0].geometry.location);
        }
      });
    });
  }
}
