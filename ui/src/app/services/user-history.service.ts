import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserHistoryService {

  readonly HARDCODE_USERHISTORY;

  constructor(private http: HttpClient) {
    this.HARDCODE_USERHISTORY = 'http://localhost:4200/assets/userhistory.json';

  }

  getUserHistory(): Promise<any>{
    return this.http.get(this.HARDCODE_USERHISTORY ).toPromise()
  }

}
