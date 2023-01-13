import { BusinessPerson } from '@app/shared/interfaces/business-person';
import { ProspectStatus } from '../enum/prospect-status.enum';
export interface Prospect extends BusinessPerson {
  statusProspect: ProspectStatus;
}
