import {Injectable} from '@angular/core';
import {HttpClientModule, HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Subject, Observable} from 'rxjs';
import {env} from '../../assets/env';
import {RequestOptions, Request, Headers, Http} from '@angular/http';
import {serverAddress} from '../../assets/server.constant';
import {Local} from '../models/Local';
import {map, filter, catchError, mergeMap} from 'rxjs/operators';


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


 async get() {
    /*
    console.log(this.LOCAL_API_URL)
    return this.http.get( this.LOCAL_API_URL + '/local/1').pipe(
      map((result: any) => {
        return [result];
      })
    );
     */
    /*
    return this.http.get( this.ROOT_URL).pipe(
      map((result: any) => {
        return result;
      })
    );
    */
    return await this.http.get( this.ROOT_URL).toPromise()
  }




}
