import { BusinessPerson } from '@app/shared/interfaces/business-person';

export interface Customer extends BusinessPerson {
  $selected?: boolean;
  lastPurchase: Date;
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
