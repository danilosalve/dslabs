import { CustomerType } from '@app/pages/my-customers/shared/enum/customer-type.enum';
import { ResourceStatus } from '@app/shared/enum/resource-status.enum';
import { TypeOfPerson } from '@app/shared/enum/type-of-person.enum';
import { PersonModel } from '@app/shared/model/person-model';
import { BusinessPerson } from '../interfaces/business-person';

export class BusinessPersonModel extends PersonModel implements BusinessPerson {
  store: number;
  fantasyName?: string | undefined;
  customerType: CustomerType;
  contactName?: string | undefined;
  email?: string | undefined;
  phone?: number | undefined;
  creditLimit?: number | undefined;
  creditLimitExpirationDate?: Date | undefined;

  constructor(
    id = 0,
    store = 0,
    name = '',
    typePerson: TypeOfPerson,
    document = '',
    customerType: CustomerType,
    state = '',
    city = '',
    address = '',
    neighborhood = '',
    zipCode = '',
    complement = '',
    status: ResourceStatus,
    registerDate = new Date(),
    contactName: string,
    email: string,
    phone: number,
    fantasyName = '',
    creditLimit = 0,
    creditLimitExpirationDate = new Date()
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

    this.store = store;
    this.customerType = customerType;
    this.fantasyName = fantasyName ? fantasyName : this.name;
    this.contactName = contactName;
    this.email = email;
    this.phone = phone;
    this.creditLimit = creditLimit;
    this.creditLimitExpirationDate = creditLimitExpirationDate;
  }
}
