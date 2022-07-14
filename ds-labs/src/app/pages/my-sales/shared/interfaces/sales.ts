import { SalesStatus } from './sales-status.enum';
import { TypeOfFreight } from './typeOfFreight.enum';
export interface Sales {
  id?: number;
  customerId: number | undefined;
  paymentMethodId?: number | undefined;
  issueDate: Date;
  carrierId: number | undefined;
  priceListId: number | undefined;
  status: SalesStatus;
  freight?: number;
  insurance?: number;
  expenses?: number;
  discount?: number;
  comment?: string;
  typeOfFreight: TypeOfFreight
}

export interface SalesBrw extends Sales {
  customerName?: string;
}
