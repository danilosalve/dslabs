import { CustomerType } from '@app/pages/my-customers/shared/enum/customer-type.enum';
import { Person } from './person';

export interface BusinessPerson extends Person {
  store: number;
  fantasyName?: string;
  customerType: CustomerType;
  contactName?: string;
  email?: string;
  businessPhone?: number;
  creditLimit?: number;
  creditLimitExpirationDate?: Date;
}
