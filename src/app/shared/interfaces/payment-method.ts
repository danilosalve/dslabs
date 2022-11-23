import { BaseResource } from './base-resource';

export interface PaymentMethod extends BaseResource {
  description: string;
  icon: string;
}
