import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, NgZone} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
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
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import { StartPointService } from '../services/start-point.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  template: `
         {{product  | json}}`
})

export class SearchComponent implements  AfterViewInit {

  @ViewChild('search') public searchElementRef: ElementRef;

  autocomplete: google.maps.places.Autocomplete;

  public local: Local;
  public localsList: Local[];
  public filteredByDistLocalsList: Local[] = [];
  public filteredByDistLocalsList2: Local[] = [];
  public checkedLocalsIdList: number[] = [];
  public pageSize = 3;
  public pageNumber = 2;
  public radius: number;
  place: google.maps.places.PlaceResult;
  public localsCoordinates: google.maps.LatLng[] = [];
  startPoint: google.maps.LatLng;


  messageFromSibling: string = "";
  state$: Observable<object>;
  product:any;

  constructor(
    private router: Router,
    private localService: LocalService,
    private startPointService: StartPointService,
    private webLocalService: WebLocalService,
    public dialog: MatDialog,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public activatedRoute: ActivatedRoute,
private location:Location
  ) {
      this.localService.getFilteredByDistLocalsList()
      .subscribe(mymessage => this.filteredByDistLocalsList = mymessage);

    this.localService.getCheckedLocalsIdList()
      .subscribe(mymessage => {
        this.checkedLocalsIdList = mymessage;
        console.log(this.checkedLocalsIdList)
      });

    this.startPointService.getStartPoint()
      .subscribe(mymessage => {
        this.startPoint = mymessage;
        console.log(this.startPoint)
      });

  //  this.state$ = this.activatedRoute.paramMap
  //    .pipe(map(() => window.history.state))
    this.activatedRoute.data.subscribe(d =>{
      console.log('data', d)
      const { redirect } = window.history.state;
     // this.router.navigateByUrl(redirect || '/');
    });

  }




  ngAfterViewInit(): void {
    this.getLocalsList();

    this.product=history.state;
    console.log("location get state");
    console.log(this.location.getState());

    this.product=history.state;
    console.log( this.product=history.state);

    console.log("Search" + this.local)

    this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["address"],
      componentRestrictions: {country: 'pl'}
    });

    this.autocomplete.addListener("place_changed", () => {

      this.ngZone.run(() => {
        this.place = this.autocomplete.getPlace();

        if (this.place.geometry === undefined || this.place.geometry === null) {
          return;
        }

        this.startPoint = this.place.geometry.location;
        this.onBtnSearchClicked();

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


  getLocalById(id: number) {
    this.webLocalService.get().subscribe(data => {
      this.local = data[id] as Local;
    });
  }

  filterLocalsByDist(radius: number) {
    if (this.localsList) {
      this.filteredByDistLocalsList = [];
      this.localsList.forEach(element => {
        let localCoordinates = new google.maps.LatLng(element.coordinates.lat, element.coordinates.long);
        this.localsCoordinates.push(localCoordinates);
        const distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(localCoordinates, this.startPoint) / 1000;

        if (distanceInKm < radius && (!this.filteredByDistLocalsList.includes(element))) {
          this.filteredByDistLocalsList.push(element);
        }
      });
    }
  }

  onBtnSearchClicked() {
    this.startPointService.updateStartPoint(this.startPoint)
    this.filterLocalsByDist(this.radius);

    console.log("filteredLocalsList")
    console.log(this.filteredByDistLocalsList)

    this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList);
    this.checkedLocalsIdList = [];


  }


  onCheckboxClicked(event, local, i) {
    switch (event.checked) {
      case true:
        local.checked = true;
        // document.getElementById("listItem" + i).classList.add("checked");
        this.checkedLocalsIdList.push(local.id);
        this.localService.updateCheckedLocalsIdList(this.checkedLocalsIdList);
        break;

      case false:
        local.checked = false;
        // document.getElementById("listItem" + i).classList.remove("checked");
        const index = this.checkedLocalsIdList.indexOf(local.id, 0);
        this.checkedLocalsIdList.splice(index, 1);
        this.localService.updateCheckedLocalsIdList(this.checkedLocalsIdList);
        break;
    }
  }

  getChecked(local) {
    for (let i of this.checkedLocalsIdList) {
      if (local.id == i) {
        return true;
        continue;
      }
    }
  }

  getBackgroundColor(local) {
    for (let i of this.checkedLocalsIdList) {
      if (local.id == i) {
        return '#dbdeeb';
        continue;
      }
    }
  }

  onRadiusChanged(event) {
    this.radius = event.currentTarget.valueOf().value.replace(/\D/g, '');
  }


}
