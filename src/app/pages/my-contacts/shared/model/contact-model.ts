import { ResourceStatus } from '@app/shared/enum/resource-status.enum';
import { TypeOfPerson } from '@app/shared/enum/type-of-person.enum';
import { PersonModel } from '@app/shared/model/person-model';
import { Contact } from '../interfaces/contact';

export class ContactModel extends PersonModel implements Contact {
  phone: number;
  email: string;
  department: string | undefined ;

  constructor(
    id = 0,
    name = '',
    document = '',
    registerDate = new Date(),
    typePerson = TypeOfPerson.NATURAL,
    status = ResourceStatus.active,
    state = '',
    city = '',
    address = '',
    neighborhood = '',
    zipCode = '',
    complement = '',
    phone = 0,
    email = '',
    department = ''
  ) {
    super(
      id,
      name,
      document,
      registerDate,
      typePerson,
      status,
      state,
      city,
      address,
      neighborhood,
      zipCode,
      complement
    );
    this.phone = phone;
    this.email = email;
    this.department = department;
  }
}
