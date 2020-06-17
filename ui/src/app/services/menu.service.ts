import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MenuItem} from '../models/MenuItem';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  readonly LOCAL_API_URL;

  constructor(private http: HttpClient) {
    this.LOCAL_API_URL = environment.localApiUrl;
  }


  addMenuItem(localId: number, menuItem: MenuItem): Promise<any> {
    return this.http.post(this.LOCAL_API_URL + '/menu?localId=' + localId, menuItem).toPromise();
  }
}
