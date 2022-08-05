export interface ProductBalance {
  id: number;
  productId: string
  warehouse: string;
  warehouseDescription: string;
  availablequantity: number;
  orderquantity: number;
  allocatedquantity: number;
  expectedinflow: number;
}
