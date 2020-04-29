import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  NgZone,
  ChangeDetectorRef
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
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {StartPointService} from '../services/start-point.service';
import {Location} from '@angular/common';
import {ProductCategoryService} from '../services/product-category.service';
import {ProductCategory} from '../models/ProductCategory';
import {Store, Select} from '@ngxs/store';
import {AddStartData, RemoveStartData} from '../actions/StartData.actions'
import {StartData} from '../models/StartData';
import {StartDataState, StartDataStateModel} from '../states/StartData.state';
import {map, filter, catchError, mergeMap, takeUntil} from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent implements AfterViewInit {

  @ViewChild('search') public searchElementRef: ElementRef;

  autocomplete: google.maps.places.Autocomplete;

  public local: Local;
  public localsList: Local[];
  public filteredByDistLocalsList: Local[] = [];
  public filteredByDistLocalsListObs: Observable<any>
  public checkedLocalsIdList: number[] = [];
  public pageSize = 3;
  public pageNumber = 2;
  public radius: number;
  place: google.maps.places.PlaceResult;
  public localsCoordinates: google.maps.LatLng[] = [];
  startPoint: google.maps.LatLng;
  startPlace: google.maps.places.PlaceResult;
  startPointObs = new Subject()
  startPointForm: FormGroup;
  startData = {name: '', selectRadius: ''};
  public productCategoryList: ProductCategory[];
  public test: string;
  tutorials$: Observable<StartDataState>

  documents$: Observable<StartData[]>;
  lastStartPoint: google.maps.LatLng;
  lastStartPlace: google.maps.places.PlaceResult;
  lastRadius: number;
  localCoordinates: google.maps.LatLng;
  // @Select(StartDataState.getStates) count$: Observable<StartData[]>;
  unsubscribe$: Subject<void> = new Subject<void>();

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
    this.localCoordinates = new google.maps.LatLng(0, 0);
    this.store.select(state => state.StartData.tutorials)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => this.startPoint = value[0].startPoint);


    this.tutorials$ = this.store.select(state => state.StartData.tutorials);
    // this.store.reset(state => state.StartData.tutorials)
    this.store.select(state => state.StartData.tutorials).subscribe(al => {
    //  this.onBtnSearchClicked()
    });



    //this.startData =  { name: '', selectRadius: ''};
    this.startPointForm = new FormGroup({
      'name': new FormControl(this.startData.name, Validators.required),
      'selectRadius': new FormControl(this.startData.selectRadius, Validators.required)
    });


  }


  ngAfterViewInit(): void {
    /*
        this.store.dispatch(new AddStartData({
          radius: this.lastRadius,
          startPoint: this.lastStartPoint,
          startPlace: this.lastStartPlace
        }))


     */


    this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["address"],
      componentRestrictions: {country: 'pl'}
    });

    this.autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        this.place = this.autocomplete.getPlace();
        console.log("place from autocomplete")
        console.log(this.place)
        if (this.place.geometry === undefined || this.place.geometry === null) {
          return;
        }

        this.startPoint = this.place.geometry.location;
        console.log("start point from autocomplete")
        console.log(this.startPoint)
        this.startPlace = this.place;
        //this.onBtnSearchClicked();
        this.startPointService.updateStartPoint(this.startPoint)
        console.log("start point after autocomplete")
        console.log(this.startPoint)
      });

    });


    this.store.select(state => state.StartData.tutorials).subscribe(async val => {
      console.log("STATES")
      console.log(val)
      if (val) {
        console.log("start point from mem")
        console.log(val[val.length - 1])
        this.lastStartPoint = val[val.length - 1].startPoint
        this.lastStartPlace = val[val.length - 1].startPlace
        this.lastRadius = val[val.length - 1].radius

        console.log(this.lastStartPoint)
        console.log(this.lastStartPlace.formatted_address)
        console.log(this.lastRadius)

        this.startData.name = this.lastStartPlace.formatted_address;
        if (this.lastRadius) {
          this.startData.selectRadius = this.lastRadius.toString() + ' km'
        }
      }
      //   this.startPointObs.next(1)
      {
        this.startPoint = this.lastStartPoint
        this.startPlace = this.lastStartPlace
        this.radius = this.lastRadius
        this.startPointService.updateStartPoint(this.startPoint)
        console.log("radius from btnsearch clicked")
        console.log(this.radius)
        console.log("start point from btnsearch clicked")
        console.log(this.startPoint)
       await this.filterLocalsByDist(this.radius);
        if(this.filteredByDistLocalsList) {
          console.log("this.filterLocalsByDist")
          console.log(this.filteredByDistLocalsList)
          this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList);
          this.checkedLocalsIdList = [];
        }
      }
    });



    this.store.dispatch(new AddStartData({
      radius: this.radius,
      startPoint: this.startPoint,
      startPlace: this.startPlace
    }))

    this.startPoint = this.startPointService.getStartPointValue();
    this.startPointService.updateStartPoint(this.startPoint);

    this.filteredByDistLocalsList = this.localService.getFilteredByDistLocalsListValues();
    this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList)

    this.checkedLocalsIdList = this.localService.getCheckedLocalsIdListValues();
    this.localService.updateCheckedLocalsIdList(this.checkedLocalsIdList);
    this.cdRef.detectChanges();

    this.startPointObs.subscribe(val =>{
      this.startPointService.updateStartPoint(this.startPoint)
      console.log("radius from btnsearch clicked")
      console.log(this.radius)
      console.log("start point from btnsearch clicked")
      console.log(this.startPoint)
      this.filterLocalsByDist(this.radius);
      this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList);
      console.log(this.filteredByDistLocalsList);
      this.checkedLocalsIdList = [];
      this.startPoint = this.startPointService.getStartPointValue();
      this.startPointService.updateStartPoint(this.startPoint);

      this.filteredByDistLocalsList = this.localService.getFilteredByDistLocalsListValues();
      this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList)

      this.checkedLocalsIdList = this.localService.getCheckedLocalsIdListValues();
      this.localService.updateCheckedLocalsIdList(this.checkedLocalsIdList);
      this.cdRef.detectChanges();

      this.store.dispatch(new AddStartData({
        radius: this.radius,
        startPoint: this.startPoint,
        startPlace: this.startPlace
      }))
    });

    /*
    if (this.startPoint && this.radius) {
      console.log("btn is clicked")
      this.startPointService.updateStartPoint(this.startPoint)
      console.log("radius from btnsearch clicked")
      console.log(this.radius)
      console.log("start point from btnsearch clicked")
      console.log(this.startPoint)
      this.filterLocalsByDist(this.radius);
      this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList);
      console.log(this.filteredByDistLocalsList);
      this.checkedLocalsIdList = [];
    }


     */


  }


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
    await this.webLocalService.get().then(data => {
      this.localsList = data as Local[]
    });
  }

  getProductCategoryList() {
    this.productCategoryService.getProductCategory().subscribe(data => {
      this.productCategoryList = data as ProductCategory[]

      console.log("prductCategoryList")
      console.log(this.productCategoryList)

    });
  }


  getLocalById(id: number) {
    this.webLocalService.get().then(data => {
      this.local = data[id] as Local;
    });
  }

    getLocalCoordinates(element:Local){
    console.log(element)
    console.log(element.coordinates.lat)
    console.log(element.coordinates.lon)
    this.localCoordinates = new google.maps.LatLng(element.coordinates.lat, element.coordinates.lon);

    console.log("localcoordinates")
    console.log( this.localCoordinates.lat())
      console.log( this.localCoordinates.lng())
    return this.localCoordinates;
  }

 async filterLocalsByDist(radius: number){
   await this.getLocalsList();
    if (this.localsList) {
      // console.log("locals list from filter by dist")
      // console.log(this.localsList)

      this.filteredByDistLocalsList = [];
      this.localsList.forEach(element => {
        console.log(element)
      //  console.log(element.coordinates.lat)
      //  console.log(element.coordinates.lon)
       this.localCoordinates = new google.maps.LatLng(element.coordinates.lat, element.coordinates.lon);

        console.log("localcoordinates from filt")
        console.log( this.localCoordinates.lat())
        console.log( this.localCoordinates.lng())
        console.log("start point lat")
        console.log(this.startPoint.lat)
        console.log(this.startPoint.lng)

     //   let startPointCoordinates = new google.maps.LatLng(this.startPoint.lat, this.startPoint.lng);
      //    this.localsCoordinates.push( this.localCoordinates);
        //   console.log(element.coordinates.lon)
      //  console.log("locals coordinates")
      //     console.log(this.localsCoordinates)
      //  console.log("start point")
      //     console.log(this.startPoint)
     // this.getLocalCoordinates(element)


      //  console.log("this localcoord")
      //  console.log(this.localCoordinates)
     //   const distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(this.localCoordinates, startPointCoordinates) / 1000;
        //  console.log(distanceInKm)
        //   if (distanceInKm < radius && (!this.filteredByDistLocalsList.includes(element))) {
        this.filteredByDistLocalsList.push(element);
        //  }
      });
      console.log("this.filterLocalsByDist from function")
      console.log(this.filteredByDistLocalsList)
   }

   // return this.filteredByDistLocalsList
  }

  onBtnSearchClicked() {

    this.startPointService.updateStartPoint(this.startPoint)
    console.log("radius from btnsearch clicked")
    console.log(this.radius)
    console.log("start point from btnsearch clicked")
    console.log(this.startPoint)
    this.filterLocalsByDist(this.radius);
    this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList);
    console.log(this.filteredByDistLocalsList);
    this.checkedLocalsIdList = [];

    console.log(this.place);
    console.log("start point to mem")
console.log(this.startPoint)
    this.store.dispatch(new AddStartData({
      radius: this.radius,
      startPoint: this.startPoint,
      startPlace: this.startPlace
    }))
    //this.store.dispatch(new RemoveStartData(5))
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

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.startPointForm.value);
  }


}
