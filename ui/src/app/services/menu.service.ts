import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MenuItem} from '../models/MenuItem';
import {environment} from '../../environments/environment';
import {WebLocalService} from './web-local.service';
import {Menu} from '../models/Menu';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  readonly LOCAL_API_URL;
  menu: Menu

  constructor(private http: HttpClient,
              private webLocalService: WebLocalService) {
    this.LOCAL_API_URL = environment.localApiUrl;
  }


  addMenuItem(localId: number, menuItem: MenuItem): Promise<any> {
    return this.http.post(this.LOCAL_API_URL + '/menu?localId=' + localId, menuItem).toPromise();
  }

  //temporary this way
  async getMenu(localId: number) {
    await this.webLocalService.getLocalById(localId).then(local => {
      this.menu = local.menu
    })
    return this.menu;
  }
}
