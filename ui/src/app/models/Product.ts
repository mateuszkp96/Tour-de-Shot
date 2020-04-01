import { Category } from './Category';
import { Ingredient } from './Ingredient';

export interface Product {
  category: Category;
  productName: string;
  price: number;
  ingredients: Array<Ingredient>;
}
