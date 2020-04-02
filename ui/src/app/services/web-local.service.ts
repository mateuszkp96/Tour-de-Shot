import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WebLocalService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:port/locals-db.json';
  }


  get(){
    return this.http.get('http://localhost:4200/assets/locals-db.json');
  }


}
