import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalService} from '../services/local.service';
import {StartPointService} from '../services/start-point.service';
import {Local} from '../models/Local';
import {UserHistoryToAdd} from '../models/UserHistoryToAdd';
import {SocialUser, AuthService} from 'angularx-social-login';
import {UserHistoryService} from '../services/user-history.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements AfterViewInit {

  checkedLocalsIdList: number[] = [];
  checkedLocalsList: Local[] = [];
  startPoint: google.maps.LatLng;
  filteredByDistLocalsList: Local[] = [];
  historyName: string = ""
  userHisotryToAdd: UserHistoryToAdd
  public user: SocialUser;
  public loggedIn: boolean;
  totalCost: number = 0
  numberOfLocalsWithChosenMenuItem: number = 0

  constructor(
    private router: Router,
    private localService: LocalService,
    private startPointService: StartPointService,
    private authService: AuthService,
    private userHistoryService: UserHistoryService
  ) {
    this.localService.getCheckedLocalsIdList()
      .subscribe(mymessage => {
        this.checkedLocalsIdList = mymessage;
        this.getCheckedLocalsListValues();
      });

    this.startPointService.getStartPoint()
      .subscribe(mymessage => {
        this.startPoint = mymessage;
        this.startPoint = this.startPointService.getStartPointValue();
      });
    this.totalCost = this.localService.getTotalCost()
    this.userHisotryToAdd = this.localService.getUserHistoryToAdd()
    if (this.userHisotryToAdd.items.length > 0)
      this.numberOfLocalsWithChosenMenuItem = this.userHisotryToAdd.items.length

  }


  ngAfterViewInit(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.loggedIn = (user != null);
    });

    this.startPoint = this.startPointService.getStartPointValue();
    this.startPointService.updateStartPoint(this.startPoint);

    this.filteredByDistLocalsList = this.localService.getFilteredByDistLocalsListValues();
    this.localService.updateFilteredByDistLocalsList(this.filteredByDistLocalsList);

    this.checkedLocalsIdList = this.localService.getCheckedLocalsIdListValues();
    this.localService.updateCheckedLocalsIdList(this.checkedLocalsIdList);

    console.log("summary product list")
    console.log(this.localService.getSummaryProductListValues())

    console.log(this.historyName)
  }


  getCheckedLocalsListValues() {
    for (let local of this.filteredByDistLocalsList)
      for (let i of this.checkedLocalsIdList) {
        if (local.id == i) {
          this.checkedLocalsList.push(local)
        }
      }
  }

  onAddToHistoryClick() {
    this.userHisotryToAdd.name = this.historyName
    console.log(this.user.id)
    console.log("HISTORY TO ADD")
    console.log(this.userHisotryToAdd)
    this.userHistoryService.addUserHistory(this.user.id, this.userHisotryToAdd)
    this.historyName = ""
  }
}
