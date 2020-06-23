import {Component, OnInit, Input, AfterViewInit, AfterContentInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {LocalDetailed} from 'src/app/models/LocalDetailed';
import {WebLocalService} from 'src/app/services/web-local.service';
import {Subject} from 'rxjs';
import {LocalToModify, InitLocalToModify} from 'src/app/models/LocalToModify';

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
  isDisable: boolean;
  point: google.maps.LatLng;
  local: LocalDetailed;
  localDetailed: LocalDetailed
  localToModify: LocalToModify = InitLocalToModify
  localLoad = new Subject<any>();
  openTime: string
  cloaseTime: string


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private webLocalService: WebLocalService,
    private ngZone: NgZone,
  ) {
  }

  ngOnInit(): void {
    this.getLocal(this.localId)  //todo: changing to appropriate local

    this.isDisable = true
    this.localLoad.asObservable()


  }

  ngAfterViewInit(): void {
    console.log(document.getElementById("inputLocalAddressStreet"))
  }

  getLocal(id: number) {
    /*
    this.webLocalService.getLocalById(id).then(l => {
      this.local = l
    })
     */

    this.webLocalService.getLocalById(this.localId).then(l => {
      console.log("l.openingHours.schedule.time")
      this.local = l
      this.local.openingHours.schedule.sort((a, b) => a.orderNumber - (b.orderNumber));


      /*
    this.local.openingHours.schedule.forEach((schedule) => {
      console.log("l.closeTime")
      // console.log(schedule.closeTime)

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
      this.localLoad.next(true)
    })
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
        this.localToModify.coordinates.lat = this.point.lat()
        this.localToModify.coordinates.lon = this.point.lng()

        let buildingNumber = this.place.address_components[0].long_name
        let streetName = this.place.address_components[1].long_name
        let city = this.place.address_components[3].long_name
        let postCode = this.place.address_components[this.place.address_components.length - 1].long_name
        this.localToModify.address.postCode = postCode
        this.localToModify.address.city = city
        this.localToModify.address.street = streetName + " " + buildingNumber

      });
    });
  }


  onModifyClick() {
    this.isDisable = false
  }

  onSaveClick() {
    this.localToModify.name = this.local.name
    this.localToModify.website = this.local.website
    this.localToModify.localCategories = this.local.localCategories
    this.localToModify.website = this.local.website
    //  this.localToModify.address = this.local.address
    this.localToModify.contact = this.local.contact

    this.localToModify.openingHours.schedule[0].openTime = this.local.openingHours.schedule[0].time.substring(0, 5)
    this.localToModify.openingHours.schedule[1].openTime = this.local.openingHours.schedule[1].time.substring(0, 5)
    this.localToModify.openingHours.schedule[2].openTime = this.local.openingHours.schedule[2].time.substring(0, 5)
    this.localToModify.openingHours.schedule[3].openTime = this.local.openingHours.schedule[3].time.substring(0, 5)
    this.localToModify.openingHours.schedule[4].openTime = this.local.openingHours.schedule[4].time.substring(0, 5)
    this.localToModify.openingHours.schedule[5].openTime = this.local.openingHours.schedule[5].time.substring(0, 5)
    this.localToModify.openingHours.schedule[6].openTime = this.local.openingHours.schedule[6].time.substring(0, 5)

    this.localToModify.openingHours.schedule[0].closeTime = this.local.openingHours.schedule[0].time.substring(8, 13)
    this.localToModify.openingHours.schedule[1].closeTime = this.local.openingHours.schedule[1].time.substring(8, 13)
    this.localToModify.openingHours.schedule[2].closeTime = this.local.openingHours.schedule[2].time.substring(8, 13)
    this.localToModify.openingHours.schedule[3].closeTime = this.local.openingHours.schedule[3].time.substring(8, 13)
    this.localToModify.openingHours.schedule[4].closeTime = this.local.openingHours.schedule[4].time.substring(8, 13)
    this.localToModify.openingHours.schedule[5].closeTime = this.local.openingHours.schedule[5].time.substring(8, 13)
    this.localToModify.openingHours.schedule[6].closeTime = this.local.openingHours.schedule[6].time.substring(8, 13)


    /*
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
        */

    console.log("LOCAL TO SAVE")
    console.log(this.localToModify)
    //this.getLocal(this.localId)
    this.isDisable = true
    this.webLocalService.updateLocal(this.localId, this.localToModify).then(() =>
      this.getLocal(this.localId))
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

  onAutocompleteInputClick() {
    console.log("On autocomplete click")
    this.autocompleteFunction()
  }


}
