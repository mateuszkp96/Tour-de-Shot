import {Component, OnInit, ViewChild, ElementRef, Input, NgZone, AfterViewInit} from '@angular/core';
import {LocalToAdd, InitLocalToAdd} from 'src/app/models/LocalToAdd';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {WebLocalService} from 'src/app/services/web-local.service';

@Component({
  selector: 'app-local-add',
  templateUrl: './local-add.component.html',
  styleUrls: ['./local-add.component.css']
})
export class LocalAddComponent implements OnInit, AfterViewInit {

  @ViewChild('address') public searchElementRef: ElementRef;
  @Input() localId: number
  autocomplete: google.maps.places.Autocomplete;
  place: google.maps.places.PlaceResult;
  localToAdd: LocalToAdd = InitLocalToAdd;
  isDisable: boolean;
  point: google.maps.LatLng;
  localLoad = new Subject<any>();
  currentDayOfWeek: string;
  ownerId: number

  constructor(
    private router: Router,
    private webLocalService: WebLocalService,
    private ngZone: NgZone,
  ) {
  }

  ngOnInit(): void {

    this.localToAdd = InitLocalToAdd
    this.localToAdd.openingHours.schedule.forEach((schedule) => {
      switch (schedule.dayOfWeek) {
        case 1:
          this.currentDayOfWeek = 'MONDAY';
          break;
        case 2:
          this.currentDayOfWeek = 'TUESDAY';
          break;
        case 3:
          this.currentDayOfWeek = 'WEDNESDAY';
          break;
        case 4:
          this.currentDayOfWeek = 'THURSDAY';
          break;
        case 5:
          this.currentDayOfWeek = 'FRIDAY';
          break;
        case 6:
          this.currentDayOfWeek = 'SATURDAY';
          break;
        case 7:
          this.currentDayOfWeek = 'SUNDAY';
          break;
      }
    });
    /*
    this.localToAdd.openingHours.schedule.forEach((schedule) => {
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
*/
    this.isDisable = false
  }

  ngAfterViewInit(): void {
    this.autocompleteFunction()
  }

  onDeleteCategoryClick(id: number) {
    if (this.localToAdd.localCategories.length > 1) {
      this.localToAdd.localCategories.splice(id, 1);
    }
    console.log(this.localToAdd.localCategories)
  }

  onAddCategoryClick() {
    this.localToAdd.localCategories.push("")
    console.log(this.localToAdd.localCategories)
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  autocompleteFunction() {
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
        this.localToAdd.coordinates.lat = this.point.lat()
        this.localToAdd.coordinates.lon = this.point.lng()

        let buildingNumber = this.place.address_components[0].long_name
        let streetName = this.place.address_components[1].long_name
        let city = this.place.address_components[3].long_name
        let postCode = this.place.address_components[this.place.address_components.length - 1].long_name
        this.localToAdd.address.postCode = postCode
        this.localToAdd.address.city = city
        this.localToAdd.address.street = streetName + " " + buildingNumber

      });
    });
  }

  onPriceCategoryChanged(event) {
    console.log(this.localToAdd.priceCategory)
  }

  onSaveClick() {
    console.log("LOCAL TO ADD")
    console.log(this.localToAdd)
    this.webLocalService.addLocal(1, this.localToAdd)

    //this.getLocal(this.localId)
    //this.isDisable = true
  }

  onCancelClick() {
    // this.getLocal(this.localId)
    // this.isDisable = true
  }

  getCurrentDayOfWeek(day: number){
    switch (day) {
      case 1:
        return 'Poniedziałek';
        break;
      case 2:
        return 'Wtorek';
        break;
      case 3:
        return 'Środa';
        break;
      case 4:
        return 'Czwartek';
        break;
      case 5:
        return 'Piątek';
        break;
      case 6:
        return 'Sobota';
        break;
      case 7:
        return 'Niedziela';
        break;
    }
  }
}

