import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class WebLoginService {


  constructor(private http: HttpClient) {}

   async getUserJson(): Promise<any> {
    return await this.http.get(environment.keycloakLoginUrl, {responseType: 'text'}).subscribe(
      (res: any) => {
        alert("News Success");
        // Where you find the array res.data or res.data.data
        console.log('res is ', res);
      },
      error => {
        alert("ERROR");
      });
   }


    )
    //return await this.http.get(this.ROOT_URL).toPromise()
  }


}
