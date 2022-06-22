import { CustomerStatus } from './customer-status.enum';

export interface Customer {
  id: number;
  name: string;
  document: string;
  state: string;
  city: string;
  status: CustomerStatus;
}
