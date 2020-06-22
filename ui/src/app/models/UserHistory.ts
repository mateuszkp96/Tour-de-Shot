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


export const InitHistoryProduct: HistoryProduct = {
  productId: 0,
  name: "",
  price: 0,
  quantity: 0,
}

export const InitHistoryCoordinates: HistoryCoordinates = {
  lat: 0,
  lon: 0,
}
export const InitHistoryItem: HistoryItem = {
  orderNumber: 0,
  localId: 0,
  localName: "",
  coordinates: InitHistoryCoordinates,
  products: [],
}

export const InitUserHistory: UserHistory = {
  content: []
}

