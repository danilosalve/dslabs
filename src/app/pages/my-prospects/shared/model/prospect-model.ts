import { CustomerType } from '@app/pages/my-customers/shared/enum/customer-type.enum';
import { ResourceStatus } from '@app/shared/enum/resource-status.enum';
import { TypeOfPerson } from '@app/shared/enum/type-of-person.enum';
import { PersonModel } from '@app/shared/model/person-model';
import { ProspectStatus } from '../enum/prospect-status.enum';
import { Prospect } from './../interfaces/prospect';

export class ProspectModel extends PersonModel implements Prospect {
    store: number;
    fantasyName?: string | undefined;
    customerType: CustomerType;
    statusProspect: ProspectStatus;

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
        businessPhone: number,
        statusProspect: ProspectStatus,
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
            complement,
            contactName,
            email,
            businessPhone,
            creditLimit,
            creditLimitExpirationDate
        );
        this.store = store;
        this.customerType = customerType;
        this.statusProspect = statusProspect ? statusProspect : ProspectStatus.QUALIFIED;
        this.fantasyName = fantasyName ? fantasyName : this.name;
    }
}

