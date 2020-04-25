import { Injectable } from '@angular/core';
import {ProductCategory} from '../models/ProductCategory';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map, filter, catchError, mergeMap} from 'rxjs/operators';
import {env} from '../../assets/env';
@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  readonly LOCAL_API_URL;
  constructor(private http: HttpClient) {
    this.LOCAL_API_URL = env.localApiUrl;
  }

  getProductCategory(): Observable<ProductCategory[]> {


  //  return this.http.get('/local/product-category').pipe(

    return this.http.get(this.LOCAL_API_URL + '/product-category').pipe(
      map((result: any) => {
        return result;
      })
    );

  }

}
