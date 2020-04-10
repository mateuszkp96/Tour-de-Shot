
import { Component, OnInit, ViewChild, ElementRef, NgZone, Input } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Local } from '../models/Local';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() searchElementRef: ElementRef;
  @Input() filteredBanks: Subject<any>;
 // @Input() inputAddress: ElementRef;

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;

  address: string;
  private geoCoder;


// @ViewChild('search')
//  public searchElementRef: ElementRef;
  autocomplete: google.maps.places.Autocomplete;
  place: google.maps.places.PlaceResult;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }


  ngOnInit() {
    this.zoom = 12;
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    this.filteredBanks.subscribe(event => {
      console.log("subscribe")
    this.autocomplete = event;
      console.log("vlue from map")
      console.log( this.autocomplete );

    //load Places Autocomplete




        console.log("search clicked");

     // console.log(this.searchElementRef.nativeElement);


        console.log(this.autocomplete);

  // this.autocomplete.addListener("place_changed", () => {

        this.ngZone.run(() => {
          //get the place result
         this.place = this.autocomplete.getPlace();

          //verify result
          if (this.place.geometry === undefined || this.place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = this.place.geometry.location.lat();
          this.longitude = this.place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  // });

  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
   if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  // Get Current Location Coordinates

/*
    this.filteredBanks.subscribe(event => {

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {types: ["address"]});
      console.log(this.searchElementRef.nativeElement);
      console.log("child");
      console.log(autocomplete);
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 12;
      });
    });

    this.zoom = 12;
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

    });
  }



 */
  }


