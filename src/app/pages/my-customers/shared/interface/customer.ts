import { CustomerPerson } from './customer-person.enum';
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
  $selected?: boolean;
  lastPurchase: Date;
  address: string;
  neighborhood: string;
  zipCode: string;
  complement?: string;
  typePerson: CustomerPerson;
  store: number;
  contactName?: string;
  email?: string;
  businessPhone?: number;
  stateDelivery: string;
  cityDelivery: string;
  addressDelivery: string;
  neighborhoodDelivery: string;
  zipCodeDelivery: string;
  complementDelivery: string;
}
