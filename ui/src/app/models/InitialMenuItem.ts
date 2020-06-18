import {Product} from './Product';


export class InitialProductCategory {
  id = null;
  name = "";
  hasChild = false;
  parentId = false;
}

export class InitialProduct {
  productId = null
  name = ""
  price = null
  description = ""
  ingredients = [""]
  productCategory = new InitialProductCategory()
}

export class InitialMenuItem {
  categoryHeader = ""
  orderNumber = null
  products = [new InitialProduct()]
}
