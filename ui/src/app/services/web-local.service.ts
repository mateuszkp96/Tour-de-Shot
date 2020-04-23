import {Injectable} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {Subject, Observable} from 'rxjs';
import {env} from '../../assets/env';
import {RequestOptions, Request, Headers, Http} from '@angular/http';
import {serverAddress} from '../../assets/server.constant';

@Injectable({
  providedIn: 'root'
})

export class WebLocalService {

  readonly LOCAL_API_URL;
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:4200/assets/locals-db.json';
    this.LOCAL_API_URL = env.localApiUrl;
  }


  get() {
    console.log("url")
    console.log(this.LOCAL_API_URL + '/local/1')
    return this.http.get(this.LOCAL_API_URL + '/local/1');
    //return this.http.get(`${this.LOCAL_API_URL}`);
  }


}
