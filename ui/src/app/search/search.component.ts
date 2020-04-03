import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInComponent } from '../sign-in/sign-in.component';
import { LocalService } from '../services/local.service';
import { WebLocalService } from '../services/web-local.service';
import { Local } from '../models/Local';
import * as locals  from  '../../assets/locals-db.json';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  local: Local;
  localsList: Local[];

  constructor(
    private router: Router,
    private localService: LocalService,
    private webLocalService: WebLocalService
  ) {}


  ngOnInit(): void {
    this.getLocalsList();
  }


  getLocalsList() {
    this.webLocalService.get().subscribe(data => {
      this.localsList = data as Local[];
      console.log( data);
    });
  }

  getLocalById(id: number) {
    this.webLocalService.get().subscribe(data => {
      this.local = data[id] as Local;
      console.log( this.local);
    });
  }



}
