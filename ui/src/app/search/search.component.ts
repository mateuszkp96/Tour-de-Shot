import { Component, OnInit, AfterViewInit,  ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInComponent } from '../sign-in/sign-in.component';
import { LocalService } from '../services/local.service';
import { WebLocalService } from '../services/web-local.service';
import { Local } from '../models/Local';
import * as locals  from  '../../assets/locals-db.json';
import { } from '@angular/google-maps'
import { Coordinates } from '../models/Coordinates';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements AfterViewInit {

  local: Local;
  localsList: Local[];
  localsCoordinates: Coordinates[];
  list: Coordinates[]=[];

  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  marker: google.maps.Marker;
  markers: google.maps.Marker[] = [];
  coordinates: google.maps.LatLng;

  localIcon = {
    url: "../../assets/beer.png",
    scaledSize: new google.maps.Size(40, 40)
  };

  LocalizationIcon = {
    url: "../../assets/localization.png",
    scaledSize: new google.maps.Size(40, 40)
  };




// localization manually set yet
  localizationLat = 52.229676;
  localizationLong = 21.012229;
  localizationCoordinates = new google.maps.LatLng(this.localizationLat, this.localizationLong);

  mapOptions: google.maps.MapOptions = {
    center: this.localizationCoordinates,
    zoom: 12
  };

  localizationMarker = new google.maps.Marker({
    position: this.localizationCoordinates,
    map: this.map,
    title: "Your localization",
    icon: this.LocalizationIcon
  });



  constructor(
    private router: Router,
    private localService: LocalService,
    private webLocalService: WebLocalService,
    public dialog: MatDialog
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent);
    console.log(this.localsList)
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngAfterViewInit(): void {
    this.getLocalsList();
    this.mapInitializer();
    console.log("Search" + this.local)
  }


  getLocalsList() {
    this.webLocalService.get().subscribe(data => {
      this.localsList = data as Local[];
      console.log(this.localsList);

      //saving locals coordinates as a markers
      this.getLocalsCoordinates();
    });
  }


  getLocalById(id: number) {
    this.webLocalService.get().subscribe(data => {
      this.local = data[id] as Local;
    });
  }

  getLocalsCoordinates() {
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


  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    //Adding Click event to default marker
    this.localizationMarker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.localizationMarker.getTitle()
      });
      infoWindow.open(this.localizationMarker.getMap(), this.localizationMarker);
    });

    this.localizationMarker.setMap(this.map);
    this.loadAllMarkers();
  }


  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      const marker = new google.maps.Marker({
      });

      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      //Add click event to open info window on marker
      marker.addListener("click", () => {
        infoWindow.open(marker.getMap(), marker);
      });

      marker.setMap(this.map);
    });
  }


}
