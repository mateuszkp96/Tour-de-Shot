import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WebLocalService } from './web-local.service';
import { Local } from '../models/Local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  local: Local;
  localsList: Local[];

  constructor(private webLocalService: WebLocalService) {

  }


getLocalsList() {
  this.webLocalService.get().subscribe(data => {
    this.localsList = data as Local[];
    console.log( this.localsList[1].name);
  });


}



}
