import {Product} from './Product';

export class InitialProduct {
  productId = null
  name = ""
  price = null
  description = ""
  ingredients = [""]
  productCategory = null
}

export class InitialMenuItem {
  categoryHeader = ""
  orderNumber = null
  products = [new InitialProduct()]
}
