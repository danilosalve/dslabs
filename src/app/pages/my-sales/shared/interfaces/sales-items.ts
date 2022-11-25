export interface SalesItems {
  id?: number;
  salesId: number;
  itemId: number;
  productId: string;
  value: number;
  quantity: number;
  amount: number,
  productName: string;
  discount?: number;
  isSelected?: boolean;
  customerOrderId?: string;
  photo?: string;
}
