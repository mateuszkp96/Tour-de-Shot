import {Injectable} from '@angular/core';
import {Product} from '../models/Product';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly LOCAL_API_URL;

  constructor(private http: HttpClient) {
    this.LOCAL_API_URL = environment.localApiUrl
  }

  addProduct(localId: number, orderNumber: number, product: Product): Promise<any> {
    return this.http.post(this.LOCAL_API_URL + '/product?localId=' + localId + "&orderNumber=" + orderNumber, product).toPromise();
  }

}
