import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WebLocalService {

  readonly ROOT_URL;
  
  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:4200/assets/locals-db.json';
  }


  get(){
    return this.http.get(`${this.ROOT_URL}`);
  }
  
}
