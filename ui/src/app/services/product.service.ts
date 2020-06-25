import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ProductToAdd} from '../models/ProductToAdd';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly LOCAL_API_URL;

  constructor(private http: HttpClient) {
    this.LOCAL_API_URL = environment.localApiUrl
  }

  addProduct(localId: number, orderNumber: number, product: ProductToAdd): Promise<any> {
    return this.http.post(this.LOCAL_API_URL + '/product?localId=' + localId + "&orderNumber=" + orderNumber, product).toPromise();
  }

  deleteProduct(localId: number, orderNumber: number, productId: number): Promise<any> {
    return this.http.delete(this.LOCAL_API_URL + '/product?localId=' + localId + "&orderNumber=" + orderNumber + "&productId=" + productId).toPromise();
    
  }

}
