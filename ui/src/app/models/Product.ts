import { ProductCategory } from './ProductCategory';

export class Product {
  productId: number
  productCategory: number
  name: string
  price: number
  ingredients: Array<string>;
  description: string
}
