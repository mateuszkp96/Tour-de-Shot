export class ProductToAdd {
  categoryId: string
  name: string
  price: number
  ingredients: Array<string>;
  description: string
}

export const InitProductToAdd: ProductToAdd = {
  categoryId: "",
  name: "",
  price: null,
  ingredients: [""],
  description: ""
}
