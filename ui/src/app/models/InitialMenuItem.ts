import {Product} from './Product';


export class InitialProductCategory {
  id = 0;
  name = "";
  hasChild = false;
  parentId = false;
}

export class InitialIngredient {
  name = ""
}

export class InitialProduct {
  productId = 1
  name = ""
  price = null
  description = ""
  ingredients = [new InitialIngredient()]
  productCategory = new InitialProductCategory()
}

export class InitialMenuItem {
  categoryHeader = ""
  orderNumber = 1
  products = new InitialProduct()
}
