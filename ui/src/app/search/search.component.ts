import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignInComponent} from '../sign-in/sign-in.component';
import {LocalService} from '../services/local.service';
import {WebLocalService} from '../services/web-local.service';
import {Local} from '../models/Local';
import * as locals from '../../assets/locals-db.json';
import {} from '@angular/google-maps'
import {Coordinates} from '../models/Coordinates';
import {ModalComponent} from '../modal/modal.component';
import {MatDialog} from '@angular/material/dialog';
import {MapsAPILoader} from '@agm/core';
import {MapComponent} from '../map/map.component';
import {Subject, BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('search') public searchElementRef: ElementRef;

  btnSearchClicked: Subject<any> = new Subject();
  autocomplete: google.maps.places.Autocomplete;

  public local: Local;
  public localsList: Local[];
  public filteredByDistLocalsList: Local[] = [];
  public checkedLocalsIdList: number[] = [];
  public pageSize = 3;
  public pageNumber = 2;
  public radius: number;
  place: google.maps.places.PlaceResult;
  public localsCoordinates: google.maps.LatLng[] = [];
  startPoint: google.maps.LatLng;

  private checkedLocalsIdListSource = new BehaviorSubject<number[]>([]);
  currentCheckedLocalsIdList = this.checkedLocalsIdListSource.asObservable();
  private filteredByDistLocalsListSource = new BehaviorSubject<Local[]>([]);
  currentFilteredByDistLocalsList = this.filteredByDistLocalsListSource.asObservable();


  constructor(
    private router: Router,
    private localService: LocalService,
    private webLocalService: WebLocalService,
    public dialog: MatDialog,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.getLocalsList();
   // this.getLocalsCoordinates();
  }

  ngAfterViewInit(): void {
    console.log("Search" + this.local)

    this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["address"],
      componentRestrictions: {country: 'pl'}
    });

    this.autocomplete.addListener("place_changed", () => {
      console.log(this.autocomplete);

      this.ngZone.run(() => {
        this.place = this.autocomplete.getPlace();

        if (this.place.geometry === undefined || this.place.geometry === null) {
          return;
        }

        this.startPoint = this.place.geometry.location;
        console.log("start point changed")
        console.log(this.startPoint)
      });
    });


  }


  openDialog(local: Local) {
    const dialogRef = this.dialog.open(ModalComponent);
    console.log(this.localsList)
    dialogRef.componentInstance.local = local;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }


  getLocalsList() {
    this.webLocalService.get().subscribe(data => {
      this.localsList = data as Local[];
    });
  }


  filterLocalsByDist() {
    if (this.localsList) {
      this.localsList.forEach(element => {
        let localCoordinates = new google.maps.LatLng(element.coordinates.lat, element.coordinates.long);
        this.localsCoordinates.push(localCoordinates);
        const  distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(localCoordinates, this.startPoint) / 1000;
        console.log(distanceInKm)
        if (distanceInKm < 4) {
          console.log("distacne")
          this.filteredByDistLocalsList.push(element);
        }
      });

    }
    console.log( this.filteredByDistLocalsList)
  }



  getLocalById(id: number) {
    this.webLocalService.get().subscribe(data => {
      this.local = data[id] as Local;
    });
  }


  onBtnSearchClicked() {
    this.btnSearchClicked.next(this.startPoint)
    if (this.radius)
      console.log(this.radius)

  this.filterLocalsByDist();
    this.filteredByDistLocalsListSource.next(this.filteredByDistLocalsList);
  }


  onCheckboxClicked(event, local, i) {
    switch (event.checked) {
      case true:
        local.checked = true;
        //document.getElementById("listItem" + i).classList.add("checked");
        this.checkedLocalsIdList.push(local.id);
        this.checkedLocalsIdListSource.next(this.checkedLocalsIdList);
        break;

      case false:
        local.checked = false;
        //document.getElementById("listItem" + i).classList.remove("checked");
        const index = this.checkedLocalsIdList.indexOf(local.id, 0);
        this.checkedLocalsIdList.splice(index, 1);
        this.checkedLocalsIdListSource.next(this.checkedLocalsIdList);
        break;
    }

  }

  onRadiusChanged(event) {
    this.radius = event.currentTarget.valueOf().value.replace(/\D/g, '');
  }


}
