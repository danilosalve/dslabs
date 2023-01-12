import { ResourceStatus } from '@app/shared/enum/resource-status.enum';
import { TypeOfPerson } from '@app/shared/enum/type-of-person.enum';
import { PersonModel } from '../../../../shared/model/person-model';
import { CustomerType } from '../enum/customer-type.enum';

export class CustomerModel extends PersonModel {
    store: number;
    customerType: CustomerType;
    lastPurchase: Date;
    stateDelivery: string;
    cityDelivery: string;
    addressDelivery: string;
    neighborhoodDelivery: string;
    zipCodeDelivery: string;
    complementDelivery: string;
    fantasyName: string;
    paymentConditionId: number;
    paymentMethodId: number;
    priceListdId: number;

    constructor(
        id: number,
        store: number,
        name: string,
        typePerson: TypeOfPerson,
        document: string,
        customerType: CustomerType,
        state: string,
        city: string,
        address: string,
        neighborhood: string,
        zipCode: string,
        complement: string,
        status: ResourceStatus,
        registerDate: Date,
        lastPurchase: Date,
        contactName: string,
        email: string,
        businessPhone: number,
        stateDelivery?: string,
        cityDelivery?: string,
        addressDelivery?: string,
        neighborhoodDelivery?: string,
        zipCodeDelivery?: string,
        complementDelivery?: string,
        fantasyName?: string,
        paymentConditionId?: number,
        paymentMethodId?: number,
        priceListdId?: number,
        creditLimit?: number,
        creditLimitExpirationDate?: Date
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
        this.lastPurchase = lastPurchase;
        this.stateDelivery = stateDelivery ? stateDelivery : state;
        this.cityDelivery = cityDelivery ? cityDelivery : city;
        this.addressDelivery = addressDelivery ? addressDelivery : address;
        this.neighborhoodDelivery = neighborhoodDelivery
            ? neighborhoodDelivery
            : neighborhood;
        this.zipCodeDelivery = zipCodeDelivery ? zipCodeDelivery : zipCode;
        this.complementDelivery = complementDelivery
            ? complementDelivery
            : complement;
        this.fantasyName = fantasyName ? fantasyName : name;
        this.paymentConditionId = paymentConditionId ? paymentConditionId : 0;
        this.paymentMethodId = paymentMethodId ? paymentMethodId : 0;
        this.priceListdId = priceListdId ? priceListdId : 0;
    }
}
