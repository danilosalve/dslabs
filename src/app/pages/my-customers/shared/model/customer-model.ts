import { CustomerStatus } from '../interface/customer-status.enum';
import { CustomerType } from '../interface/customer-type';

export class CustomerModel {
    id = 0;
    name = '';
    document = '';
    state = ''
    city = ''
    status = CustomerStatus.active;
    customerType = CustomerType.FINAL_COSTUMER;
    registerDate = new Date();
    lastPurchase = new Date();

    constructor() {}
}
