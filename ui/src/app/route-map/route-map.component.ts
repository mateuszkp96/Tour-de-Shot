import {Component, OnInit, ViewChild, ElementRef, NgZone, Input, AfterViewInit} from '@angular/core';
import {MapsAPILoader, MouseEvent} from '@agm/core';
import {Local} from '../models/Local';
import {Coordinates} from '../models/Coordinates';
import {Subject, BehaviorSubject} from 'rxjs';
import { LocalService } from '../services/local.service';
import { StartPointService } from '../services/start-point.service';
import { WebLocalService } from '../services/web-local.service';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.css']
})
export class RouteMapComponent implements AfterViewInit {


  @Input() filteredByDistLocalsList: Local[];
  @Input() checkedLocalsIdList: number[]=[];
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
  destinations: google.maps.LatLng[] = [];
  destinationsId: number[] = [];

  mapOptions: google.maps.MapOptions = {
    center: this.localizationCoordinates,
    zoom: 12.7
  };

  localIcon = {
    url: "../../assets/beer.png",
    scaledSize: new google.maps.Size(34, 34),
    anchor: new google.maps.Point(17, 30)
  };

  checkedLocalIcon = {
    url: "../../assets/checkedBeer.png",
    scaledSize: new google.maps.Size(34, 34),
    anchor: new google.maps.Point(17, 30)
  };

  localizationIcon = {
    url: "../../assets/localization.png",
    scaledSize: new google.maps.Size(34, 34),
    anchor: new google.maps.Point(17, 30)
  };
  localizationMarker = new google.maps.Marker({
    map: this.map,
    title: "Your localization",
    icon: this.localizationIcon
  });

  routePolyline = new google.maps.Polyline({
    path: this.destinations,
    geodesic: true,
    strokeColor: '#1a3fff',
    strokeOpacity: 0.8,
    strokeWeight: 4.5
  });

  constructor(
    private ngZone: NgZone,
    private localService: LocalService,
    private webLocalService: WebLocalService,
    private startPointService: StartPointService,
  ) {
    this.startPointService.getStartPoint()
      .subscribe(mymessage => {
        if(mymessage){
          this.localizationCoordinates = mymessage;

          this.localizationMarker.setPosition(this.localizationCoordinates);
          this.mapOptions.center = this.localizationCoordinates;
          this.map.setCenter(this.localizationCoordinates);
          this.localizationMarker.setMap(this.map);
        }
      });

    this.localService.getFilteredByDistLocalsList()
      .subscribe(mymessage => {
        this.filteredByDistLocalsList = mymessage;
        this.saveFilteredLocalsAsMarkers();
        //this.loadMarkers();
      });

    this.localService.getCheckedLocalsIdList()
      .subscribe(mymessage => {
        this.checkedLocalsIdList = mymessage;
        this.loadOnlyCheckedLocalsMarkers();
        this.drawRoute();
      });

  }


  ngAfterViewInit() {
    this.mapInitializer();
    this.geoCoder = new google.maps.Geocoder;
  }



  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    this.localizationMarker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.localizationMarker.getTitle()
      });
      infoWindow.open(this.localizationMarker.getMap(), this.localizationMarker);
    });
    this.mapOptions.center = this.localizationCoordinates;
    this.map.setCenter(this.localizationCoordinates);
  }


  saveFilteredLocalsAsMarkers() {
    if (this.filteredByDistLocalsList) {
      this.clearMarkers();
      this.markers = [];

      this.filteredByDistLocalsList.forEach(element => {
        this.marker = new google.maps.Marker({
          position: new google.maps.LatLng(element.coordinates.lat, element.coordinates.lon),
          map: this.map,
          title: element.name,
          icon: this.localIcon,
        });

        this.marker.set("id", element.id);
        this.markers.push(this.marker);
      });
    }
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


  loadOnlyCheckedLocalsMarkers() {
    for (let j in this.markers) {
      this.markers[j].setMap(null);

      for (let i of this.checkedLocalsIdList) {
        if (this.markers[j].get("id") == i) {
          this.markers[j].setIcon(this.checkedLocalIcon);
          this.markers[j].setMap(this.map);
        }
      }
    }
  }

  async drawRoute() {
    this.routePolyline.setMap(null);
    this.destinations = [];
    this.destinationsId = [];
    console.log("this.destinationsIdList")
    console.log(this.checkedLocalsIdList)
    if (this.checkedLocalsIdList.length > 1) {
      for (let i of this.checkedLocalsIdList) {
        await this.webLocalService.getLocalById(i).then(local => {
          this.destinationsId.push(local.id)
          this.destinations.push(new google.maps.LatLng(local.coordinates.lat, local.coordinates.lon))
          console.log("this.destinationsId")
          console.log(this.destinationsId)

          this.routePolyline.setPath(this.destinations)
          this.routePolyline.setMap(this.map);


          console.log("this.destinationsId")
          console.log(this.destinationsId)

        });
      }

    }
  }

}


