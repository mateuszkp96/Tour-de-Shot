import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalService } from '../services/local.service';
import { StartPointService } from '../services/start-point.service';
import { Local } from '../models/Local';
@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements AfterViewInit {

  checkedLocalsIdList: number[] = [];
  startPoint: google.maps.LatLng;
  filteredByDistLocalsList: Local[] = [];
  
  constructor(
    private router: Router,
    private localService: LocalService,
    private startPointService: StartPointService
  ) {
    this.localService.getCheckedLocalsIdList()
      .subscribe(mymessage => {
        this.checkedLocalsIdList = mymessage;
        console.log("checked locas from route")
        console.log(this.checkedLocalsIdList)
       // this.localService.updateCheckedLocalsIdList( this.checkedLocalsIdList)
      });

    this.startPointService.getStartPoint()
      .subscribe(mymessage => {
        this.startPoint = mymessage;
        console.log("start point from route")
        console.log(this.startPoint)
       // this.startPointService.updateStartPoint( this.startPoint)
      });
  }


  ngAfterViewInit(): void {
    console.log("start point from route")
    console.log(this.startPoint)


    this.startPoint = this.startPointService.getStartPointValue();
    this.startPointService.updateStartPoint(this.startPoint);

    this.filteredByDistLocalsList = this.localService.getFilteredByDistLocalsListValues();
    this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList);

    this.checkedLocalsIdList = this.localService.getCheckedLocalsIdListValues();
    this.localService.updateCheckedLocalsIdList(this.checkedLocalsIdList);

  }


}
