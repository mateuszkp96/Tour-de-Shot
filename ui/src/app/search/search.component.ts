import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  NgZone,
  ChangeDetectorRef,
  HostListener,
  OnDestroy
} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

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
import {Subject, BehaviorSubject, Observable, Subscription} from 'rxjs';
import {StartPointService} from '../services/start-point.service';
import {Location} from '@angular/common';
import {ProductCategoryService} from '../services/product-category.service';
import {ProductCategory} from '../models/ProductCategory';
import {Store, Select} from '@ngxs/store';
import {AddStartData, RemoveStartData, RemoveAllStartData} from '../actions/StartData.actions'
import {StartData} from '../models/StartData';
import {StartDataState, StartDataStateModel} from '../states/StartData.state';
import {map, filter, catchError, mergeMap, takeUntil} from 'rxjs/operators';
import {async} from 'rxjs/internal/scheduler/async';
import {Item} from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent implements AfterViewInit, OnDestroy {

  @ViewChild('search') public searchElementRef: ElementRef;

  autocomplete: google.maps.places.Autocomplete;
  public local: Local;
  public localsList: Local[];
  public localsByPage: Local[] = [];
  public filteredByDistLocalsList: Local[] = [];
  public checkedLocalsIdList: number[] = [];
  public pageSize = 3;
  public pageNumber = 1;
  public radius: number;
  place: google.maps.places.PlaceResult;
  public localsCoordinates: google.maps.LatLng[] = [];
  startPoint: google.maps.LatLng;
  startPlace: google.maps.places.PlaceResult;
  startPointForm: FormGroup;
  startData = {name: '', selectRadius: ''};
  public productCategoryList: ProductCategory[];
  public test: string;
  tutorials$: Observable<StartDataState>
  startDataNumber = 0;
  localCoordinates: google.maps.LatLng;
  stateSubscription: Subscription;
  localsJson: Object

  constructor(
    private router: Router,
    private localService: LocalService,
    private startPointService: StartPointService,
    private webLocalService: WebLocalService,
    private productCategoryService: ProductCategoryService,
    public dialog: MatDialog,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef,
    private store: Store
  ) {
    this.localService.getFilteredByDistLocalsList()
      .subscribe(mymessage => {
        this.filteredByDistLocalsList = mymessage
        // this.filteredByDistLocalsList = this.localService.getFilteredByDistLocalsListValues();
      });

    this.localService.getCheckedLocalsIdList()
      .subscribe(mymessage => {
        this.checkedLocalsIdList = mymessage;
      });

    this.startPointService.getStartPoint()
      .subscribe(mymessage => {
        this.startPoint = mymessage;
      });
  }


  ngOnInit(): void {

    //this.startData =  { name: '', selectRadius: ''};
    this.startPointForm = new FormGroup({
      'name': new FormControl(this.startData.name, Validators.required),
      'selectRadius': new FormControl(this.startData.selectRadius, Validators.required)
    });


  }


  ngAfterViewInit(): void {

    this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["address"],
      componentRestrictions: {country: 'pl'},
      fields: ['geometry', 'address_component', 'formatted_address']
    });

    this.autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        this.place = this.autocomplete.getPlace();

        if (this.place.geometry === undefined || this.place.geometry === null) {
          return;
        }

        this.startPoint = this.place.geometry.location;
        this.startPlace = this.place;
        this.onBtnSearchClicked();
      });
    });


    this.stateSubscription = this.store.select(state => state.StartData.tutorials).subscribe(async val => {
      console.log("STATES")
      if (val.length > 0) {
        this.startPoint = new google.maps.LatLng(val[val.length - 1].startPointLat, val[val.length - 1].startPointLon)
        this.startPlace = val[val.length - 1].startPlace
        this.radius = val[val.length - 1].radius
        this.pageNumber = val[val.length - 1].pageNumber
        console.log(val)

        this.startData.name = this.startPlace.formatted_address;
        if (this.radius) {
          this.startData.selectRadius = this.radius.toString() + ' km'
        }

        console.log("LAST POINT")
        console.log([this.startData.name, this.radius])


        this.startPointService.updateStartPoint(this.startPoint)
        await this.filterLocalsByDist(this.radius);
        if (this.filteredByDistLocalsList) {
          this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList);
        }

        this.webLocalService.getLocalsByPage(this.pageNumber - 1, this.pageSize).then(data => {
          this.localsByPage = data["content"] as Local[];
        });


      }

      //if number of stored states is > 10 -> remove first 5
      if (val.length > 10)
        this.store.dispatch(new RemoveStartData(5))

    });


    this.startPoint = this.startPointService.getStartPointValue();
    this.startPointService.updateStartPoint(this.startPoint);

    this.filteredByDistLocalsList = this.localService.getFilteredByDistLocalsListValues();
    this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList)

    this.checkedLocalsIdList = this.localService.getCheckedLocalsIdListValues();
    this.localService.updateCheckedLocalsIdList(this.checkedLocalsIdList);
    this.cdRef.detectChanges();

  }


  // this works also while changing tabs
  ngOnDestroy() {
    //this.store.dispatch(new RemoveAllStartData());
    //this.store.reset(state => state.StartData.tutorials)
    //this.stateSubscription.unsubscribe();
  }

  /*
    // this works also while refreshing
    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHandler(event) {
     // this.store.dispatch(new RemoveAllStartData());
      this.store.dispatch(new AddStartData({
        id: this.startDataNumber++,
        radius: this.radius,
        startPointLat: this.startPoint.lat(),
        startPointLon: this.startPoint.lng(),
        startPlace: this.startPlace
      }))
    }
  */

  get name() {
    return this.startPointForm.get('name');
  }

  get selectRadius() {
    return this.startPointForm.get('selectRadius');
  }

  openDialog(local: Local) {
    const dialogRef = this.dialog.open(ModalComponent);
    console.log(this.localsList)
    dialogRef.componentInstance.local = local;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  async getLocalsList() {
    await this.webLocalService.getLocalsJson().then(data => {
      this.localsList = data as Local
    });
  }
  
  getLocalsByPage(pageNumber: number, pageSize: number) {
    this.webLocalService.getLocalsByPage(pageNumber - 1, pageSize).then(data => {
      this.localsByPage = data["content"] as Local[];
    });
  }

  getProductCategoryList() {
    this.productCategoryService.getProductCategory().subscribe(data => {
      this.productCategoryList = data as ProductCategory[]
    });
  }


  async filterLocalsByDist(radius: number) {
    await this.getLocalsList();

    if (this.localsList.length > 1) {
      this.filteredByDistLocalsList = [];
      this.localsList.forEach(element => {

        this.localCoordinates = new google.maps.LatLng(element.coordinates.lat, element.coordinates.lon);
        const distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(this.localCoordinates, this.startPoint) / 1000;
        if (distanceInKm < radius && (!this.filteredByDistLocalsList.includes(element))) {
          this.filteredByDistLocalsList.push(element);
        }
      });

    }

  }

  onBtnSearchClicked() {
    this.startPointService.updateStartPoint(this.startPoint)

    this.filterLocalsByDist(this.radius);
    this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList);
    console.log(this.filteredByDistLocalsList);
    this.checkedLocalsIdList = [];

    if (this.radius && this.startPoint.lat() && this.startPoint.lng() && this.startPlace && this.pageNumber)
      this.rememberActualState()
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
        const index = this.checkedLocalsIdList.indexOf(local.id, 0);
        this.checkedLocalsIdList.splice(index, 1);
        this.localService.updateCheckedLocalsIdList(this.checkedLocalsIdList);
        break;
    }
  }


  getChecked(local) {
    //console.log("Checked Locals To HTML")
    //console.log(this.checkedLocalsIdList)
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
    if (this.radius && this.startPoint.lat() && this.startPoint.lng() && this.startPlace && this.pageNumber)
      this.rememberActualState()
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.startPointForm.value);
  }


  async onChangePage(event, page, pageSize) {
    this.pageNumber = page;
    await this.getLocalsByPage(page, pageSize);
    if (this.radius && this.startPoint.lat() && this.startPoint.lng() && this.startPlace && this.pageNumber)
      this.rememberActualState()
  }

  rememberActualState() {
    this.store.dispatch(new AddStartData({
      id: this.startDataNumber++,
      radius: this.radius,
      startPointLat: this.startPoint.lat(),
      startPointLon: this.startPoint.lng(),
      startPlace: this.startPlace,
      pageNumber: this.pageNumber
    }))
  }

}
