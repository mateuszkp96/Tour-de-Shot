import { ProductCategory } from './ProductCategory';
import { Ingredient } from './Ingredient';

export interface Product {
  productId: number
  name: string
  price: number
  description: string
  ingredients: Array<Ingredient>;
}
