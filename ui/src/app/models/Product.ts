import { ProductCategory } from './ProductCategory';

export class Product {
  productId: number
  productCategoryName: string
  name: string
  price: number
  ingredients: Array<string>;
  description: string
}
