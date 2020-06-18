import { ProductCategory } from './ProductCategory';
import { MenuItem } from './MenuItem';

export interface Menu {
  menuHeader: string
  items: Array<MenuItem>
}
