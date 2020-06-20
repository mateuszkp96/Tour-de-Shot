import { ProductCategory } from './ProductCategory';

export class Product {
  productId: number
  categoryId: number
  name: string
  price: number
  ingredients: Array<string>;
  description: string
}
