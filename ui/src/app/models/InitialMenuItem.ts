import { Product } from './Product';
export class InitialIngredient {
  name: "składniki"
}

export class InitialProduct {
  productId = 1
  name = "produkt"
  price = 10
  description ="opis"
  ingredients = new InitialIngredient()
}

export class InitialMenuItem {
  categoryHeader= "Kategoria"
  orderNumber = 1
  products = new InitialProduct()
}
