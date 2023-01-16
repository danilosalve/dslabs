import { Person } from '@app/shared/interfaces/person';

export interface Contact extends Person {
  phone: number;
  email: string;
  department?: string;
}
