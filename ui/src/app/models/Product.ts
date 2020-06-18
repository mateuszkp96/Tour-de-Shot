import { ProductCategory } from './ProductCategory';

export class Product {
  productId: number
  name: string
  price: number
  description: string
  ingredients: Array<string>;
  productCategory: ProductCategory;
}
