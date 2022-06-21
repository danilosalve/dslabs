import { SalesStatus } from './sales-status.enum';
export interface Sales {
  id?: number;
  customerId: number;
  paymentMethodId?: number;
  issueDate: Date;
  status: SalesStatus;
}

export interface SalesBrw extends Sales {
  customerName?: string;
}
