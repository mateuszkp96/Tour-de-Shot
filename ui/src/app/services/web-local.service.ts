import {Injectable} from '@angular/core';
import {HttpClientModule, HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Subject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {RequestOptions, Request, Headers, Http} from '@angular/http';
import {Local} from '../models/Local';
import {map, filter, catchError, mergeMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class WebLocalService {

  readonly LOCAL_API_URL;
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.LOCAL_API_URL = environment.localApiUrl;
   // this.ROOT_URL = 'http://localhost:4200/assets/locals-db.json';
  }


  async getLocalsJson(): Promise<any> {
    return await this.http.get(this.LOCAL_API_URL + '/local').toPromise()
    //return await this.http.get(this.ROOT_URL).toPromise()
  }

  getLocalById(id: number): Promise<any> {
    return this.http.get(this.LOCAL_API_URL + '/local/' + id).toPromise()
  }

  getLocalsByPage(page: number, pageSize): Promise<any> {
    return this.http.get(this.LOCAL_API_URL + '/local?page=' + page + '&pageSize=' + pageSize).toPromise()
  }

  deleteLocalById(id: number): Promise<any> {
    return this.http.delete(this.LOCAL_API_URL + '/local/' + id).toPromise();
  }

}
