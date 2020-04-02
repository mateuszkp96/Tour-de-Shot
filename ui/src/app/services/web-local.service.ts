import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WebLocalService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }


  get(url: string){
    return this.http.get(`${this.ROOT_URL}/${url}`);
  }

  //for testing yet
  post(url: string, payload: Object){
    return this.http.post(`${this.ROOT_URL}/${url}`, payload);
  }
  
  //for testing yet
  patch(url: string, payload: Object){
    return this.http.patch(`${this.ROOT_URL}/${url}`, payload);
  }
  
  //for testing yet
  delete(url: string){
    return this.http.delete(`${this.ROOT_URL}/${url}`);
  }
}
