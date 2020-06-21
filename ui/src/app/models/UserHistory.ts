export class UserHistory {
  items: HistoryItems;
  name: string;
}

export class HistoryItems {
  localId: number;
  orderNumber: number;
  products: HistoryProduct[];
}

export class HistoryProduct {
  productId: number;
  quantity: number;
}

export const InitHistoryProduct: HistoryProduct = {
  productId: 0,
  quantity: 0,
}
export const InitHistoryItems: HistoryItems = {
  localId: 0,
  orderNumber: 0,
  products: [],
}

export const InitUserHistory: UserHistory = {
  items: InitHistoryItems,
  name: "historyName"
}
