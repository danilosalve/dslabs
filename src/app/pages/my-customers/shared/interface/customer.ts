import { Person } from '@app/shared/interfaces/person';
import { CustomerType } from '../enum/customer-type.enum';

export interface Customer extends Person {
  fantasyName?: string;
  customerType: CustomerType;
  $selected?: boolean;
  lastPurchase: Date;
  store: number;
  stateDelivery: string;
  cityDelivery: string;
  addressDelivery: string;
  neighborhoodDelivery: string;
  zipCodeDelivery: string;
  complementDelivery: string;
  paymentConditionId?: number;
  paymentMethodId?: number;
  priceListdId?: number;
}
