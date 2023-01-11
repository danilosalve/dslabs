import { ResourceStatus } from '@app/shared/enum/resource-status.enum';
import { TypeOfPerson } from '@app/shared/enum/type-of-person.enum';
import { CustomerType } from '../enum/customer-type.enum';

export interface Customer {
  id: number;
  name: string;
  fantasyName?: string;
  document: string;
  state: string;
  city: string;
  status: ResourceStatus;
  customerType: CustomerType;
  registerDate: Date;
  $selected?: boolean;
  lastPurchase: Date;
  address: string;
  neighborhood: string;
  zipCode: string;
  complement?: string;
  typePerson: TypeOfPerson;
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
  paymentConditionId?: number;
  paymentMethodId?: number;
  priceListdId?: number;
  creditLimit?: number;
  creditLimitExpirationDate?: Date;
}
