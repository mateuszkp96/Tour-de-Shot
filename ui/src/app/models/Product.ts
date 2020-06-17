import { ProductCategory } from './ProductCategory';
import { Ingredient } from './Ingredient';

export class Product {
  productId: number
  name: string
  price: number
  description: string
  ingredients: Array<Ingredient>;
}
