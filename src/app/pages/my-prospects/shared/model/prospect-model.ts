import { CustomerType } from '@app/pages/my-customers/shared/enum/customer-type.enum';
import { ResourceStatus } from '@app/shared/enum/resource-status.enum';
import { TypeOfPerson } from '@app/shared/enum/type-of-person.enum';
import { BusinessPersonModel } from '@app/shared/model/business-person-model';

import { ProspectStatus } from '../enum/prospect-status.enum';
import { Prospect } from './../interfaces/prospect';

export class ProspectModel extends BusinessPersonModel implements Prospect {
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
            store,
            name,
            typePerson,
            document,
            customerType,
            state,
            city,
            address,
            neighborhood,
            zipCode,
            complement,
            status,
            registerDate,
            contactName,
            email,
            businessPhone,
            fantasyName,
            creditLimit,
            creditLimitExpirationDate
        );
        this.statusProspect = statusProspect
            ? statusProspect
            : ProspectStatus.QUALIFIED;
    }
}
