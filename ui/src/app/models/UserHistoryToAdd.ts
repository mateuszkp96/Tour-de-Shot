export class UserHistoryToAdd {
  items: UserHistoryToAddItem[];
  name: string;
}

export class UserHistoryToAddItem {
  localId: number;
  orderNumber: number;
  products: UserHistoryToAddProduct[];
}

export class UserHistoryToAddProduct {
  productId: number;
  quantity: number;
}


export const InitUserHistoryToAddProduct: UserHistoryToAddProduct = {
  productId: null,
  quantity: null,
}
export const InitUserHistoryToAddItem: UserHistoryToAddItem = {
  localId: 0,
  orderNumber: 0,
  products: [],
}
export const InitUserHistoryToAdd: UserHistoryToAdd = {
  items: [],
  name: "",
}

/*
export class UserHistoryForSummary{
  items:  UserHistoryForSummaryItem[]
}
export class UserHistoryForSummaryItem{
  localId: number;
  products: number[];
}

export const InitUserHistoryForSummaryItem: UserHistoryForSummaryItem = {
  localId: 0,
  products: [],
}

export const InitUserHistoryForSummary: UserHistoryForSummary = {
  items: [InitUserHistoryForSummaryItem]
}


 */
