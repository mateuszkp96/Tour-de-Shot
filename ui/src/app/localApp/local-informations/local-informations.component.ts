import {Component, OnInit, Input, AfterViewInit, AfterContentInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDetailed} from 'src/app/models/LocalDetailed';
import {WebLocalService} from 'src/app/services/web-local.service';
import {Subject} from 'rxjs';
import {LocalToAdd} from 'src/app/models/LocalToAdd';

@Component({
  selector: 'app-local-informations',
  templateUrl: './local-informations.component.html',
  styleUrls: ['./local-informations.component.css']
})
export class LocalInformationsComponent implements OnInit, AfterViewInit {

  @ViewChild('address') public searchElementRef: ElementRef;
  @Input() localId: number
  autocomplete: google.maps.places.Autocomplete;
  place: google.maps.places.PlaceResult;
  local: LocalToAdd;
  isDisable: boolean;
  point: google.maps.LatLng;
  localLoad = new Subject<any>();

  constructor(
    private router: Router,
    private webLocalService: WebLocalService,
    private ngZone: NgZone,
  ) {
  }

  ngOnInit(): void {
    this.localId = 2; // hardcoded here yet

    console.log(this.localId)
    this.getLocal(this.localId)  //todo: changing to appropriate local

    this.isDisable = true
    this.localLoad.asObservable()

  }

  ngAfterViewInit(): void {

  }

  getLocal(id: number) {
    /*
    this.webLocalService.getLocalById(id).then(l => {
      this.local = l
    })
     */
    this.webLocalService.getHardCodedLocalToModify().then(l => {
      this.local = l
      this.local.openingHours.schedule.forEach((schedule) => {
        if (schedule.dayOfWeek === 'MONDAY') {
          schedule.dayOfWeek = 'Poniedziałek';
        } else if (schedule.dayOfWeek === 'TUESDAY') {
          schedule.dayOfWeek = 'Wtorek';
        } else if (schedule.dayOfWeek === 'WEDNESDAY') {
          schedule.dayOfWeek = 'Środa';
        } else if (schedule.dayOfWeek === 'THURSDAY') {
          schedule.dayOfWeek = 'Czwartek';
        } else if (schedule.dayOfWeek === 'FRIDAY') {
          schedule.dayOfWeek = 'Piątek';
        } else if (schedule.dayOfWeek === 'SATURDAY') {
          schedule.dayOfWeek = 'Sobota';
        } else {
          schedule.dayOfWeek = 'Niedziela';
        }
      });

      this.localLoad.next(true)
    })
  }

  autocompleteFunction(autocomplete: any) {
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

        this.point = this.place.geometry.location;
        //  this.startPlace = this.place;

      });
    });
  }


  onModifyClick() {
    this.isDisable = false
  }

  onSaveClick() {
    console.log("LOCAL TO SAVE")

    this.local.openingHours.schedule.forEach((schedule) => {
      switch (schedule.dayOfWeek) {
        case 'Poniedziałek':
          schedule.dayOfWeek = 'MONDAY';
          break;
        case 'Wtorek':
          schedule.dayOfWeek = 'TUESDAY';
          break;
        case 'Środa':
          schedule.dayOfWeek = 'WEDNESDAY';
          break;
        case 'Czwartek':
          schedule.dayOfWeek = 'THURSDAY';
          break;
        case 'Piątek':
          schedule.dayOfWeek = 'FRIDAY';
          break;
        case 'Sobota':
          schedule.dayOfWeek = 'SATURDAY';
          break;
        case 'Niedziela':
          schedule.dayOfWeek = 'SUNDAY';
          break;
      }
    });

    console.log(this.local)
    // todo: save with service
    //this.getLocal(this.localId)
    this.isDisable = true
  }

  onCancelClick() {
    this.getLocal(this.localId)
    this.isDisable = true
  }

  onDeleteCategoryClick(id: number) {
    if (this.local.localCategories.length > 1) {
      this.local.localCategories.splice(id, 1);
    }
    console.log(this.local.localCategories)
  }

  onAddCategoryClick() {
    this.local.localCategories.push("")
    console.log(this.local.localCategories)
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
