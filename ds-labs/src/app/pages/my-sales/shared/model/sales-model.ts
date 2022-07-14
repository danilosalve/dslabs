import { SalesStatus } from '../interfaces/sales-status.enum';

export class SalesModel {
  customerId: undefined;
  paymentMethodId: undefined;
  priceListId = undefined;
  issueDate = new Date();
  status = SalesStatus.Open;
  carrierId = undefined;
  freight = 0;
  insurance = 0;
  expenses = 0;
  discount = 0;

  constructor() {}
}
