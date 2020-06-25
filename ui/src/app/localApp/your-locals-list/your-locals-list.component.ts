import {Component, OnInit} from '@angular/core';
import {Local} from 'protractor/built/driverProviders';
import {UserService} from 'src/app/services/user.service';
import { LocalService } from 'src/app/services/local.service';
import { WebLocalService } from 'src/app/services/web-local.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromLocalLogin from '../../state/localLogin.reducer';
import * as localLoginActions from '../../state/localLogin.actions';

@Component({
  selector: 'app-your-locals-list',
  templateUrl: './your-locals-list.component.html',
  styleUrls: ['./your-locals-list.component.css']
})
export class YourLocalsListComponent implements OnInit {

  yourLocalsList: Local[] = []
  numberOfPages: number = 1
  pageNumber = 1
  pageSize = 7
  userId: number

  constructor(private userService: UserService,
              private localServie: LocalService,
              private webLocalServie: WebLocalService,
              private router: Router,
  private store: Store<fromLocalLogin.AppState>,

  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new localLoginActions.SelectLocalLoggedIn(true));
    this.getYourLocalsList()
  }

  onChangePage($event, pageNumber, pageSize) {
    console.log("On change page")
  }

  getYourLocalsList() {

    this.userService.getYourLocalsList().then(locals => {
        this.yourLocalsList = locals['content'] as Local[]
        console.log(this.yourLocalsList)
      })


/*
    this.webLocalServie.getLocalsByPage(this.pageNumber-1,this.pageSize).then(locals => {
      this.yourLocalsList = locals['content'] as Local[]
      console.log("locals list")
      console.log(this.yourLocalsList)
    })
    */

  }


  onAddLocalClick(){
    this.router.navigate(['add-local'])


  }
  onDetailsClick(localId: number){
    this.router.navigate(['local/'+localId])
  }
}
