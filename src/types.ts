export interface StoreItemType {
  id: number;
  name: string;
  description: string;
  suggestedPrice: number;
  actualPrice: number;
  discount: number;
}

export interface OrderDataType {
  item: StoreItemType;
  fullName: string;
  address: string;
  email: string;
  phone: string;
  creditCard: string;
  orderNumber: number;
}
