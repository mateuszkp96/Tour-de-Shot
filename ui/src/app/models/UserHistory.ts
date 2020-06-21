export class UserHistory {
  content: HistoryEvent[];
}

export class HistoryEvent {
  id: number;
  name: string;
  timestamp: string;
  items: HistoryItem[];
  price: number;
}

export class HistoryItem {
  orderNumber: number;
  localId: number;
  localName: string
  coordinates: HistoryCoordinates
  products: HistoryProduct[];
}

export class HistoryCoordinates {
  lat: number;
  lon: number;
}

export class HistoryProduct {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}


/*
export const InitHistoryProduct: HistoryProduct = {
  productId: 0,
  quantity: 0,
}
export const InitHistoryItem: HistoryItem = {
  localId: 0,
  orderNumber: 0,
  products: [],
}

export const InitUserHistory: UserHistory = {
  items: [],
  name: "historyName"
}
*/
