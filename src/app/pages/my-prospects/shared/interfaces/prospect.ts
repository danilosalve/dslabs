import { CustomerType } from '@app/pages/my-customers/shared/enum/customer-type.enum';
import { Person } from '@app/shared/interfaces/person';
import { ProspectStatus } from '../enum/prospect-status.enum';

export interface Prospect extends Person {
  store: number;
  fantasyName?: string;
  customerType: CustomerType;
  statusProspect: ProspectStatus;
}
