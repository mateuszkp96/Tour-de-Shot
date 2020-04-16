import {Component, OnInit, ViewChild, ElementRef, NgZone, Input, AfterViewInit} from '@angular/core';
import {MapsAPILoader, MouseEvent} from '@agm/core';
import {Local} from '../models/Local';
import {Coordinates} from '../models/Coordinates';
import {Subject, BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {

  @Input() btnSearchClicked: Subject<any>;
  @Input() currentCheckedLocalsIdList: BehaviorSubject<any>;
  @Input() localsList: Local[];
  @Input() checkedLocalsIdList: number[];
  @ViewChild("mapContainer", {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  marker: google.maps.Marker;
  autocomplete: google.maps.places.Autocomplete;
  place: google.maps.places.PlaceResult;
  private geoCoder;

  //start map center
  localizationLat: number = 52.229676;
  localizationLong: number = 21.012229;
  localizationCoordinates = new google.maps.LatLng(this.localizationLat, this.localizationLong);

  mapOptions: google.maps.MapOptions = {
    center: this.localizationCoordinates,
    zoom: 12
  };

  localIcon = {
    url: "../../assets/beer.png",
    scaledSize: new google.maps.Size(40, 40),
  };

  checkedLocalIcon = {
    url: "../../assets/checkedBeer.png",
    scaledSize: new google.maps.Size(40, 40),
  };

  localizationIcon = {
    url: "../../assets/localization.png",
    scaledSize: new google.maps.Size(40, 40)
  };

  localizationMarker = new google.maps.Marker({
    map: this.map,
    title: "Your localization",
    icon: this.localizationIcon
  });


  constructor(
    private ngZone: NgZone
  ) {}


  ngAfterViewInit() {

    this.mapInitializer();
    this.geoCoder = new google.maps.Geocoder;

    this.btnSearchClicked.subscribe(event => {
      this.autocomplete = event;

      this.ngZone.run(() => {
        this.place = this.autocomplete.getPlace();

        if (this.place.geometry === undefined || this.place.geometry === null) {
          return;
        }

        this.localizationLat = this.place.geometry.location.lat();
        this.localizationLong = this.place.geometry.location.lng();
      });

      this.localizationCoordinates = new google.maps.LatLng(this.localizationLat, this.localizationLong);
      this.localizationMarker.setPosition(this.localizationCoordinates);
      this.mapOptions.center = this.localizationCoordinates;
      this.map.setCenter(this.localizationCoordinates);
      this.localizationMarker.setMap(this.map);
    });


    this.loadCheckedLocalsMarkers();
  }


  saveLocalsAsMarkers() {
    if (this.localsList) {
      this.localsList.forEach(element => {
        this.marker = new google.maps.Marker({
          position: new google.maps.LatLng(element.coordinates.lat, element.coordinates.long),
          map: this.map,
          title: element.name,
          icon: this.localIcon
        });

        this.markers.push(this.marker);
      });
    }
  }


  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    this.localizationMarker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.localizationMarker.getTitle()
      });
      infoWindow.open(this.localizationMarker.getMap(), this.localizationMarker);
    });

    this.localizationMarker.setMap(this.map);
    this.saveLocalsAsMarkers();
    this.loadAllMarkers();
  }


  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      const marker = new google.maps.Marker({});

      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      marker.setMap(this.map);
    });
  }


  loadCheckedLocalsMarkers() {
    this.currentCheckedLocalsIdList.subscribe(message => {
        this.checkedLocalsIdList = message;
        console.log(this.checkedLocalsIdList);

        for (let j in this.markers) {
          this.markers[j].setIcon(this.localIcon);
          this.markers[j].setMap(this.map);
        }

        for (let i of this.checkedLocalsIdList) {
          //i = locals are indexed from 1, markers are indexed from 0
          this.markers[i - 1].setIcon(this.checkedLocalIcon);
          this.markers[i - 1].setMap(this.map);
        }
      }
    );
  }


}


