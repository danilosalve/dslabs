import { Person } from '@app/shared/interfaces/person';
import { ResourceStatus } from '../enum/resource-status.enum';
import { TypeOfPerson } from '../enum/type-of-person.enum';

export class PersonModel implements Person {
    id: number;
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
    complement?: string | undefined;
    contactName?: string | undefined;
    email?: string | undefined;
    businessPhone?: number | undefined;
    creditLimit?: number | undefined;
    creditLimitExpirationDate?: Date | undefined;

    constructor(
        id = 0,
        name = '',
        document = '',
        registerDate = new Date(),
        typePerson?: TypeOfPerson,
        status?: ResourceStatus,
        state = '',
        city = '',
        address = '',
        neighborhood = '',
        zipCode = '',
        complement = '',
        contactName = '',
        email = '',
        businessPhone = 0,
        creditLimit = 0,
        creditLimitExpirationDate = new Date()
    ) {
        this.id = id;
        this.name = name;
        this.document = document;
        this.registerDate = registerDate;
        this.typePerson = typePerson ? typePerson : TypeOfPerson.NATURAL;
        this.status = status ? status : ResourceStatus.active;
        this.state = state;
        this.city = city;
        this.address = address;
        this.neighborhood = neighborhood;
        this.zipCode = zipCode;
        this.complement = complement;
        this.contactName = contactName;
        this.email = email;
        this.businessPhone = businessPhone;
        this.creditLimit = creditLimit;
        this.creditLimitExpirationDate = creditLimitExpirationDate;
    }

    get age(): number {
        const date = new Date();
        const currentMonth = date.getMonth();
        const currentDay = date.getDate();

        const registerMonth = this.registerDate.getMonth();
        const registerDay = this.registerDate.getDate();
        let age = date.getFullYear() - this.registerDate.getFullYear();

        if (
            currentMonth < registerMonth ||
            (currentMonth === registerMonth && currentDay < registerDay)
        ) {
            age--;
        }

        return age;
    }
}
