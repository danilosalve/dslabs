import { SalesStatus } from './sales-status.enum';
export interface Sales {
  id?: number;
  customerId: number;
  paymentMethodId?: number;
  issueDate: Date;
  carrierId: number;
  status: SalesStatus;
  freight?: number;
  insurance?: number;
  expenses?: number;
  discount?: number;
}

export interface SalesBrw extends Sales {
  customerName?: string;
}
