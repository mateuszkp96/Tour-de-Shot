import {Product} from './Product';

export class InitialProduct {
  productId = null
  name = null
  price = null
  description = null
  ingredients = [null]
  productCategory = null
}

export class InitialMenuItem {
  categoryHeader = null
  orderNumber = null
  products = [new InitialProduct()]
}
