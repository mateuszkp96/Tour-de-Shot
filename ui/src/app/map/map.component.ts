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
  @Input() currentFilteredByDistLocalsList: BehaviorSubject<any>;
  @Input() localsList: Local[];
  @Input() filteredByDistLocalsList: Local[];
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
  ) {
  }


  ngAfterViewInit() {

    this.mapInitializer();
    this.geoCoder = new google.maps.Geocoder;

    this.btnSearchClicked.subscribe(event => {
      this.localizationCoordinates = event;
      this.localizationMarker.setPosition(this.localizationCoordinates);
      this.mapOptions.center = this.localizationCoordinates;
      this.map.setCenter(this.localizationCoordinates);
      this.localizationMarker.setMap(this.map);

      this.saveFilteredLocalsAsMarkers();
      this.loadMarkers();

    });

    this.loadCheckedLocalsMarkers();
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
    this.loadMarkers();
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

        //setting marker id the same as local id
        this.marker.set("id", element.id);
        this.markers.push(this.marker);
      });
    }
  }

  saveFilteredLocalsAsMarkers() {
    this.currentFilteredByDistLocalsList.subscribe(message => {
      this.filteredByDistLocalsList = message;

      if (this.filteredByDistLocalsList) {
        this.clearMarkers();
        this.markers = [];

        this.filteredByDistLocalsList.forEach(element => {
          this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(element.coordinates.lat, element.coordinates.long),
            map: this.map,
            title: element.name,
            icon: this.localIcon,
          });

          this.marker.set("id", element.id);
          this.markers.push(this.marker);
        });
      }
    });

  }


  loadMarkers(): void {
    this.markers.forEach(markerInfo => {
      const marker = new google.maps.Marker({});
      markerInfo.setMap(null);

      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      markerInfo.setMap(this.map);
    });
  }

  clearMarkers(): void {
    this.markers.forEach(markerInfo => {
      const marker = new google.maps.Marker({});
      markerInfo.setMap(null);
    });
  }


  loadCheckedLocalsMarkers() {
    this.currentCheckedLocalsIdList.subscribe(message => {
      this.checkedLocalsIdList = message;

      for (let j in this.markers) {
        this.markers[j].setIcon(this.localIcon);
        this.markers[j].setMap(this.map);

        //changing marker icon when local is checked
        for (let i of this.checkedLocalsIdList) {
          if (this.markers[j].get("id") == i) {
            this.markers[j].setIcon(this.checkedLocalIcon);
            this.markers[j].setMap(this.map);
          }
        }
      }
    });
  }


}


