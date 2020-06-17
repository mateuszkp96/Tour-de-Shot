import { Product } from './Product';

export interface MenuItem {
  categoryHeader: string
  orderNumber: number
  products: Array<Product>
}
