import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class WebLoginService {


  constructor(private http: HttpClient) {}

   async getUserJson(): Promise<any> {
    return await this.http.get(environment.keycloakLoginUrl, {responseType: 'text'}).toPromise()
    //return await this.http.get(this.ROOT_URL).toPromise()
  }


}
