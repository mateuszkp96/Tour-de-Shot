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
import {Subject} from 'rxjs';

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

  constructor(
    private router: Router,
    private localService: LocalService,
    private webLocalService: WebLocalService,
    public dialog: MatDialog,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.getLocalsList();
  }

  ngAfterViewInit(): void {
    console.log("Search" + this.local)

    this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {types: ["address"]});
    this.autocomplete.addListener("place_changed", () => {
      console.log(this.autocomplete);
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


  onBtnSearchClicked() {
    this.btnSearchClicked.next(this.autocomplete)
  }


}
