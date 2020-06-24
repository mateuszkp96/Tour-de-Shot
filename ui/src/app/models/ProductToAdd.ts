export class ProductToAdd {
  categoryId: number
  name: string
  price: number
  ingredients: Array<string>;
  description: string
}

export const InitProductToAdd: ProductToAdd = {
  categoryId: null,
  name: "",
  price: null,
  ingredients: [""],
  description: ""
}
