import { Component, OnInit } from '@angular/core';
import { Local } from 'protractor/built/driverProviders';
import { UserService } from 'src/app/services/user.service';

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
  constructor(private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = 1
  }

  onChangePage($event, pageNumber, pageSize){
    console.log("On change page")
  }

  getYourLocalsList(){
    this.userService.getYourLocalsList(this.userId).then(locals=> {
        this.yourLocalsList = locals
      console.log(this.yourLocalsList)
      }
    )
  }
}
