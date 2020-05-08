import {Component, OnInit, ViewChild, ElementRef, NgZone, Input, AfterViewInit} from '@angular/core';
import {MapsAPILoader, MouseEvent} from '@agm/core';
import {Local} from '../models/Local';
import {Coordinates} from '../models/Coordinates';
import {Subject, BehaviorSubject} from 'rxjs';
import {LocalService} from '../services/local.service';
import {StartPointService} from '../services/start-point.service';
import {WebLocalService} from '../services/web-local.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, AfterViewInit {

  @Input() btnSearchClicked: Subject<any>;
  @Input() localsList: Local[];
  @Input() filteredByDistLocalsList: Local[];
  @Input() checkedLocalsIdList: number[] = [];
  @ViewChild("mapContainer", {static: false}) gmap: ElementRef;


  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  marker: google.maps.Marker;
  markersId: number[] = [];
  filteredByDistLocalsListId: number[] = [];
  autocomplete: google.maps.places.Autocomplete;
  place: google.maps.places.PlaceResult;
  private geoCoder;
  destinations: google.maps.LatLng[] = [];
  destinationsId: number[] = [];
  //start map center
  localizationLat: number = 52.229676;
  localizationLong: number = 21.012229;
  localizationCoordinates = new google.maps.LatLng(this.localizationLat, this.localizationLong);

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
    private startPointService: StartPointService
  ) {
    this.startPointService.getStartPoint()
      .subscribe(mymessage => {
        if (mymessage) {
          this.localizationCoordinates = mymessage;

          this.localizationMarker.setPosition(this.localizationCoordinates);
          this.mapOptions.center = this.localizationCoordinates;
          this.map.setOptions(this.mapOptions)
          this.localizationMarker.setMap(this.map);
        }
      });

    this.localService.getFilteredByDistLocalsList()
      .subscribe(mymessage => {
        this.filteredByDistLocalsList = mymessage;
        this.saveFilteredLocalsAsMarkers();
      });


    this.localService.getCheckedLocalsIdList()
      .subscribe(mymessage => {
        this.checkedLocalsIdList = mymessage;
        this.loadCheckedLocalsMarkers();
        this.drawRoute();
      });

  }


  ngOnInit() {
    this.geoCoder = new google.maps.Geocoder;
    // this.localizationCoordinates = this.startPointService.getStartPointValue();
  }

  ngAfterViewInit() {
    this.mapInitializer();

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

  saveLocalsAsMarkers() {
    if (this.localsList) {
      this.localsList.forEach(element => {
        this.marker = new google.maps.Marker({
          position: new google.maps.LatLng(element.coordinates.lat, element.coordinates.lon),
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
    this.filteredByDistLocalsListId = [];
    if (this.filteredByDistLocalsList) {
      this.filteredByDistLocalsList.forEach(element => {
        this.filteredByDistLocalsListId.push(element.id)
      });

      this.filteredByDistLocalsList.forEach(element => {

        // markers that must be added
        if (!this.markersId.includes(element.id)) {
          this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(element.coordinates.lat, element.coordinates.lon),
            map: this.map,
            title: element.name,
            icon: this.localIcon,
          });

          this.marker.set("id", element.id);
          this.markers.push(this.marker);
          this.markersId.push(element.id);
        }
      });


      // markers that must be deleted from map
      let missing = this.markersId.filter(item => this.filteredByDistLocalsListId.indexOf(item) < 0);
      missing.forEach(element => {
        const index = this.markersId.indexOf(element, 0);
        this.markers[index].setMap(null)
        this.markersId.splice(index, 1);
        this.markers.splice(index, 1);
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

  loadCheckedLocalsMarkers() {
    console.log("Checked Locals Id List")
    console.log(this.checkedLocalsIdList)
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
  }

  async drawRoute() {
    if (this.checkedLocalsIdList) {
      for (let i of this.checkedLocalsIdList) {

        // destinations that must be added
        if (!this.destinationsId.includes(i)) {
          await this.webLocalService.getLocalById(i).then(local => {
            this.destinationsId.push(local.id)
            this.destinations.push(new google.maps.LatLng(local.coordinates.lat, local.coordinates.lon))

            this.routePolyline.setPath(this.destinations)
            this.routePolyline.setMap(this.map);

          });
        }
      }

      // destinations that must be deleted
      let missing = this.destinationsId.filter(item => this.checkedLocalsIdList.indexOf(item) < 0);
      missing.forEach(element => {
        const index = this.destinationsId.indexOf(element, 0);
        this.destinationsId.splice(index, 1);
        this.destinations.splice(index, 1);
        this.routePolyline.setPath(this.destinations);
      });

    }

    console.log("Route Id List")
    console.log(this.destinationsId)
  }


}


