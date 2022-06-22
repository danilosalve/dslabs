export interface SalesItems {
  id: number;
  salesId: number;
  itemId: number;
  productId: number;
  value: number;
  quantity: number;
  amount: number,
  productName?: string;
}
