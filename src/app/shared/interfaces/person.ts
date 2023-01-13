import { ResourceStatus } from '../enum/resource-status.enum';
import { TypeOfPerson } from '../enum/type-of-person.enum';
import { BaseResource } from './base-resource';

export interface Person extends BaseResource {
  name: string;
  document: string;
  registerDate: Date;
  typePerson: TypeOfPerson;
  status: ResourceStatus;
  state: string;
  city: string;
  address: string;
  neighborhood: string;
  zipCode: string;
  complement?: string;
}
