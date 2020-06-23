import {Component, OnInit} from '@angular/core';
import {Local} from 'protractor/built/driverProviders';
import {UserService} from 'src/app/services/user.service';
import { LocalService } from 'src/app/services/local.service';
import { WebLocalService } from 'src/app/services/web-local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-your-locals-list',
  templateUrl: './your-locals-list.component.html',
  styleUrls: ['./your-locals-list.component.css']
})
export class YourLocalsListComponent implements OnInit {

  yourLocalsList: Local[] = []
  numberOfPages: number = 1
  pageNumber = 1
  pageSize = 5
  userId: number

  constructor(private userService: UserService,
              private localServie: LocalService,
              private webLocalServie: WebLocalService,
              private router: Router

  ) {
  }

  ngOnInit(): void {
    this.userId = 1
    this.getYourLocalsList()
  }

  onChangePage($event, pageNumber, pageSize) {
    console.log("On change page")
  }

  getYourLocalsList() {
    /*
    this.userService.getYourLocalsList(this.userId).then(locals => {
        this.yourLocalsList = locals
        console.log(this.yourLocalsList)
      })
     */
    this.webLocalServie.getLocalsByPage(this.pageNumber-1,this.pageSize).then(locals => {
      this.yourLocalsList = locals['content'] as Local[]
      console.log("locals list")
      console.log(this.yourLocalsList)
    })
  }

  onDetailsClick(localId: number){
    this.router.navigate(['local/'+localId])
  }
}
