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
  numberOfPages: number
  pageNumber = 1
  pageSize = 5
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
    this.getYourLocalsList(this.pageNumber, this.pageSize)
  }

  getYourLocalsList(page:number, pageSize:number) {
/*
    this.userService.getYourLocalsList().then(locals => {
        this.yourLocalsList = locals['content'] as Local[]
        console.log(this.yourLocalsList)
      })
*/
    this.userService.getYourLocalsListByPage(page-1,pageSize).then(locals => {
      this.yourLocalsList = locals['content'] as Local[]
      //console.log( this.numberOfPages = locals['totalElements'])
this.numberOfPages = this.numberOfPages = locals['totalElements']

      //console.log(this.yourLocalsList)
    })
/*
    this.webLocalServie.getLocalsByPage(this.pageNumber-1,this.pageSize).then(locals => {
      this.yourLocalsList = locals['content'] as Local[]
      console.log("locals list")
      console.log(this.yourLocalsList)
    })
    */

  }

  async onChangePage(event, page, pageSize) {
    this.pageNumber = page;
// await this.getLocalsByPage(page, pageSize);
    await this.getYourLocalsList(page, pageSize)


  }

  onAddLocalClick(){
    this.router.navigate(['add-local'])

  }
  onDetailsClick(localId: number){
    this.router.navigate(['local/'+localId])
  }
}
