import { CustomerStatus } from './customer-status.enum';
import { CustomerType } from './customer-type';

export interface Customer {
  id: number;
  name: string;
  document: string;
  state: string;
  city: string;
  status: CustomerStatus;
  customerType: CustomerType;
  registerDate: Date;
}
