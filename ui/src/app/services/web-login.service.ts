import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class WebLoginService {

  readonly ROOT_URL;
  constructor(private http: HttpClient) {

    this.ROOT_URL = 'http://localhost:8080/http://localhost:8081/'
   }

   async getUserJson(): Promise<any> {
    return await this.http.get(this.ROOT_URL).toPromise()
    //return await this.http.get(this.ROOT_URL).toPromise()
  }


}
