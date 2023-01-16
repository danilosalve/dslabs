import { BaseResource } from './../../../../shared/interfaces/base-resource';

export interface ContactRelationship extends BaseResource {
  contactId: number;
  customerId: number;
}
