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
import {AddStartData, RemoveStartData, RemoveAllStartData} from '../actions/StartData.actions'
import {StartData} from '../state/models/StartData';
import {map, filter, catchError, mergeMap, takeUntil} from 'rxjs/operators';
import {async} from 'rxjs/internal/scheduler/async';
import {Item} from '@syncfusion/ej2-angular-navigations';
import {Store, select} from '@ngrx/store';
import * as fromStartData from '../state/startData.reducer'
import * as startDataActions from '../state/startData.actions'
import {StartPointState} from '../state/startData.reducer';
import {StartDataState} from '../state/startData.reducer';
import {LocalFilter, FilterCategory, InitLocalFilter, InitFilterCategory} from '../models/LocalFilter';


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
  startPointForm: FormGroup;
  startDataName: string
  startDataSelectRadius: string;
  public productCategoryList: ProductCategory[];
  public test: string;
  startDataNumber = 0;
  localCoordinates: google.maps.LatLng;
  stateSubscription: Subscription;
  localsJson: Object
  startPointLat: number
  startPointLon: number
  checkedLocalCategories: string[] = []
  localFilter: LocalFilter = null

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
    private store: Store<fromStartData.AppState>
  ) {
    this.localService.getFilteredByDistLocalsList()
      .subscribe(mymessage => {
        this.filteredByDistLocalsList = mymessage
        this.filteredByDistLocalsList = this.localService.getFilteredByDistLocalsListValues();
      });

    this.localService.getCheckedLocalsIdList()
      .subscribe(mymessage => {
        this.checkedLocalsIdList = mymessage;
      });

    this.startPointService.getStartPoint()
      .subscribe(mymessage => {
        this.startPoint = mymessage;
      });

    this.localService.getCurrentCheckedCategories().subscribe(checkedCategories => {
      this.checkedLocalCategories = checkedCategories
      console.log("CHECKED LOCAL CATEGORIES: " + this.checkedLocalCategories)
      //  if (this.startPoint != null && this.radius != null && this.startDataName != null && this.pageNumber != null && this.checkedLocalCategories.length > 0) {
      if (this.startPoint != null && this.radius != null && this.startDataName != null && this.pageNumber != null) {
        this.rememberActualState(this.startPoint.lat(), this.startPoint.lng(), this.radius, this.startDataName, this.pageNumber, this.checkedLocalCategories)
      }
      /*else {
        console.log("Trzeba usunać wszystkie dane")
        this.filteredByDistLocalsList = [];
        this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList)
        this.localsByPage = [];
        this.filteredByDistLocalsList = [];
        this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList)
        this.checkedLocalsIdList = [];
        this.localService.updateCheckedLocalsIdList(this.checkedLocalsIdList)
      }

       */
    })
  }


  ngOnInit(): void {
    this.startPointForm = new FormGroup({
      'name': new FormControl(this.startDataName, Validators.required),
      'selectRadius': new FormControl(this.startDataSelectRadius, Validators.required)
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
          //  this.startPlace = this.place;
          this.startDataName = this.place.formatted_address
          if (this.startPoint && this.startDataName) {

            if (this.radius != null && this.startDataName != null && this.pageNumber != null && this.checkedLocalCategories != null)
              this.rememberActualState(this.startPoint.lat(), this.startPoint.lng(), this.radius, this.startDataName, this.pageNumber, this.checkedLocalCategories)
          }
          this.startPointService.updateStartPoint(this.startPoint)

          // this.onBtnSearchClicked();
          // this.localsByPage = []
          this.checkedLocalsIdList = []
          this.localService.updateCheckedLocalsIdList(this.checkedLocalsIdList);
          //  this.filteredByDistLocalsList = []
          //  this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList)

        }
      );
    });


    this.store.pipe(select(fromStartData.getStartData)).subscribe(
      async startData => {
        if (startData.startPoint.startPointLat != null && startData.startPoint.startPointLon != null && startData.radius != null) {
          this.startPoint = new google.maps.LatLng(startData.startPoint.startPointLat, startData.startPoint.startPointLon)
          this.radius = startData.radius
          this.startDataName = startData.startPlaceFormattedAddress
          this.startDataSelectRadius = startData.radius + " km"
          this.pageNumber = startData.pageNumber
          this.checkedLocalCategories = startData.checkedLocalCategories

          console.log("START DATA STATE")
          console.log(startData)

          this.startPointService.updateStartPoint(this.startPoint)
          await this.filterLocals();

          if (this.checkedLocalCategories.length > 0) {
            await this.webLocalService.getLocalsByFilterAndPage(this.localFilter, this.pageNumber - 1, this.pageSize).then(data => {
              console.log(this.localFilter)
              this.localsByPage = data["content"] as Local[];
              console.log(this.localsByPage)
            });
            await this.webLocalService.getLocalsByFilter(this.localFilter).then(data => {
              this.filteredByDistLocalsList = data["content"] as Local[];
              this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList)
            });
          }
        }
        if (startData.startPoint.startPointLat == null || startData.startPoint.startPointLon == null || startData.startPlaceFormattedAddress == null || startData.radius == null || startData.checkedLocalCategories.length == 0) {
          this.filteredByDistLocalsList = [];
          this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList)
          this.localsByPage = [];
          this.filteredByDistLocalsList = [];
          this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList)
          this.checkedLocalsIdList = [];
          this.localService.updateCheckedLocalsIdList(this.checkedLocalsIdList)
        }
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
    let id = local.id
    this.webLocalService.getLocalById(id).then(local => {
      let localById = local
      const dialogRef = this.dialog.open(ModalComponent);
      console.log(this.localsList)
      dialogRef.componentInstance.local = localById;

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    })

  }

  async getLocalsList() {
    await this.localService.getLocalsList().then(data => {
      this.localsList = data as Local[]
    });
  }


  getProductCategoryList() {
    this.productCategoryService.getProductCategory().subscribe(data => {
      this.productCategoryList = data as ProductCategory[]
    });
  }


  filterLocals() {
    if (this.startPoint && this.radius) {
      if (this.checkedLocalCategories.length > 0)
        this.localFilter = InitLocalFilter
      this.localFilter.filters.localization.lat = this.startPoint.lat()
      this.localFilter.filters.localization.lon = this.startPoint.lng()
      this.localFilter.filters.localization.maxDistance = this.radius
      this.localFilter.filters.categories = this.checkedLocalCategories.map(category => (new FilterCategory(category)))
      console.log("LOCALS FILTER:" + JSON.stringify(this.localFilter))
      this.getLocalsByFilter(this.localFilter)
      this.getLocalsByFilterAndPage(this.localFilter, this.pageNumber, this.pageSize)

    } else {
      this.localFilter = InitLocalFilter
      this.localFilter.filters.localization.lat = this.startPoint.lat()
      this.localFilter.filters.localization.lon = this.startPoint.lng()
      this.localFilter.filters.localization.maxDistance = this.radius
      this.localFilter.filters.categories = this.checkedLocalCategories.map(category => (new FilterCategory(category)))
      console.log("LOCALS FILTER:" + JSON.stringify(this.localFilter))
      this.getLocalsByFilter(this.localFilter)
      this.getLocalsByFilterAndPage(this.localFilter, this.pageNumber, this.pageSize)
    }
  }

  getLocalsByFilter(localFilter: LocalFilter) {
    this.webLocalService.getLocalsByFilter(localFilter).then(locals => {
      this.filteredByDistLocalsList = locals['content'] as Local[]
      this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList);
    });
  }

  getLocalsByFilterAndPage(localFilter: LocalFilter, pageNumber: number, pageSize: number) {
    this.webLocalService.getLocalsByFilterAndPage(localFilter, pageNumber - 1, pageSize).then(locals => {
      this.localsByPage = locals['content'] as Local[]
    });
  }


  onBtnSearchClicked() {
    if (this.checkedLocalCategories.length == 0) {
      this.localsByPage = [];
      this.filteredByDistLocalsList = [];
      this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList)
    }
    this.filterLocals()

    // this.startPointService.updateStartPoint(this.startPoint)
    // this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList);
    console.log(this.filteredByDistLocalsList);
    this.checkedLocalsIdList = [];
    this.localService.updateCheckedLocalsIdList(this.checkedLocalsIdList)
    if (this.radius && this.startPoint.lat() && this.startPoint.lng() && this.startDataName && this.pageNumber)
      this.rememberActualState(this.startPoint.lat(), this.startPoint.lng(), this.radius, this.startDataName, this.pageNumber, this.checkedLocalCategories)

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

    if (this.startPoint.lat() != null && this.startPoint.lng() != null && this.startDataName != null && this.pageNumber != null && this.checkedLocalCategories != null)
      this.rememberActualState(this.startPoint.lat(), this.startPoint.lng(), this.radius, this.startDataName, this.pageNumber, this.checkedLocalCategories)

  }

  onSubmit() {
// TODO: Use EventEmitter with form value
    console.warn(this.startPointForm.value);
  }


  async onChangePage(event, page, pageSize) {
    this.pageNumber = page;
// await this.getLocalsByPage(page, pageSize);
    await this.getLocalsByFilterAndPage(this.localFilter, page, pageSize)
    if (this.radius && this.startPoint.lat() && this.startPoint.lng() && this.startDataName && this.pageNumber) {
// this.rememberActualState()
    }


  }


  rememberActualState(startPointLat: number, startPointLon: number, radius: number, startPlaceFormattedAddress: string, pageNumber: number, checkedLocalCategories: string[]) {
    let startPointState = new StartPointState()
    startPointState.startPointLat = startPointLat
    startPointState.startPointLon = startPointLon

    let startDataState = new StartDataState()
    startDataState.startPoint = startPointState
    startDataState.radius = radius
    startDataState.startPlaceFormattedAddress = startPlaceFormattedAddress
    startDataState.pageNumber = pageNumber
    startDataState.checkedLocalCategories = checkedLocalCategories
    this.store.dispatch(new startDataActions.SelectStartData(startDataState))
  }


}
