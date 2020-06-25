import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MenuItem} from '../models/MenuItem';
import {environment} from '../../environments/environment';
import {WebLocalService} from './web-local.service';
import {Menu} from '../models/Menu';
import {CategoryHeaderToAdd} from '../models/MenuToAdd';


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

  //add section to menu
  addCategoryHeader(localId: number, categoryHeaderToAdd: CategoryHeaderToAdd): Promise<any> {
    return this.http.post(this.LOCAL_API_URL + '/menu/section/' + localId, categoryHeaderToAdd).toPromise();
  }

  updateCategoryHeader(localId: number, categoryHeaderToModify: CategoryHeaderToAdd): Promise<any> {
    return this.http.put(this.LOCAL_API_URL + '/menu/section/' + localId, categoryHeaderToModify).toPromise();
  }

  //removing section from menu
  deleteCategoryHeader(localId: number, orderNumber: number): Promise<any> {
    return this.http.delete(this.LOCAL_API_URL + '/menu/' + localId + '?orderNumber=' + orderNumber).toPromise();
  }

  deleteProduct(localId: number, orderNumber: number, productId: number) {
    return this.http.delete(this.LOCAL_API_URL + '/product?localId=' + localId + '&orderNumber=' + orderNumber + '&productId=' + productId).toPromise();

  }

  addEmptyMenu(localId: number): Promise<any>{
    return this.http.post(this.LOCAL_API_URL + '/menu/' + localId, {}).toPromise();
  }
}
