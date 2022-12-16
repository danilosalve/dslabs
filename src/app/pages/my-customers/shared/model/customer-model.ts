import { CustomerPerson } from '../interface/customer-person.enum';
import { CustomerStatus } from '../interface/customer-status.enum';
import { CustomerType } from '../interface/customer-type';

export class CustomerModel {
    id: number;
    store: number;
    name: string;
    typePerson:CustomerPerson;
    document: string;
    customerType: CustomerType;
    state: string;
    city: string;
    address: string;
    neighborhood: string;
    zipCode: string;
    complement: string;
    status: CustomerStatus;
    registerDate: Date;
    lastPurchase: Date;
    contactName: string;
    email: string;
    businessPhone: number;
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
    creditLimit: number;
    creditLimitExpirationDate: Date;

    constructor(
        id: number,
        store: number,
        name: string,
        typePerson: CustomerPerson,
        document: string,
        customerType: CustomerType,
        state: string,
        city: string,
        address: string,
        neighborhood: string,
        zipCode: string,
        complement: string,
        status: CustomerStatus,
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
        this.id = id;
        this.store = store;
        this.name = name;
        this.typePerson = typePerson;
        this.document = document;
        this.customerType = customerType;
        this.state = state;
        this.city = city;
        this.address = address;
        this.neighborhood = neighborhood;
        this.zipCode = zipCode;
        this.complement = complement;
        this.status = status;
        this.registerDate = registerDate;
        this.lastPurchase = lastPurchase;
        this.contactName = contactName;
        this.email = email;
        this.businessPhone = businessPhone;
        this.stateDelivery = stateDelivery ? stateDelivery : state;
        this.cityDelivery = cityDelivery ? cityDelivery : city;
        this.addressDelivery = addressDelivery ? addressDelivery : address;
        this.neighborhoodDelivery = neighborhoodDelivery ? neighborhoodDelivery : neighborhood;
        this.zipCodeDelivery = zipCodeDelivery? zipCodeDelivery : zipCode;
        this.complementDelivery = complementDelivery ? complementDelivery : complement;
        this.fantasyName = fantasyName ? fantasyName : name;
        this.paymentConditionId = paymentConditionId ? paymentConditionId : 0;
        this.paymentMethodId = paymentMethodId ? paymentMethodId : 0;
        this.priceListdId = priceListdId ? priceListdId : 0;
        this.creditLimit = creditLimit ? creditLimit : 0;
        this.creditLimitExpirationDate = creditLimitExpirationDate ? creditLimitExpirationDate : new Date();
    }
}
