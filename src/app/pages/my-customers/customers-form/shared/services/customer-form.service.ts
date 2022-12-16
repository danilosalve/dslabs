import { Injectable } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { Customer } from '../../../shared/interface/customer';
import { CustomerStatus } from '../../../shared/interface/customer-status.enum';
import { DocumentExistValidator } from '../validators/document-exist-validator';
import { documentValidator } from '../validators/document.validator';

@Injectable({
    providedIn: 'root'
})
export class CustomerFormService {
    constructor(
        protected formBuilder: UntypedFormBuilder,
        protected customerService: CustomerService,
        protected poNotificationService: PoNotificationService
    ) {}

    getCustomerForm(customer: Customer): UntypedFormGroup {
        return this.formBuilder.group({
            id: [customer.id, [Validators.required]],
            store: [
                customer.store,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(2)
                ])
            ],
            name: [customer.name, [Validators.required]],
            fantasyName: [customer.fantasyName],
            document: [
                customer.document,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(9),
                    Validators.maxLength(14),
                    documentValidator
                ]),
                DocumentExistValidator.customerDocumentExist(
                    this.customerService,
                    this.poNotificationService
                )
            ],
            customerType: [customer.customerType, [Validators.required]],
            typePerson: [customer.typePerson],
            contactName: [customer.contactName],
            email: [customer.email, [Validators.email]],
            businessPhone: [customer.businessPhone],
            registerDate: [customer.registerDate],
            lastPurchase: [customer.lastPurchase],
            status: [CustomerStatus.active],
            zipCode: [
                customer.zipCode,
                Validators.compose([
                    Validators.minLength(8),
                    Validators.maxLength(8)
                ])
            ],
            state: [customer.state],
            city: [customer.city],
            address: [customer.address],
            neighborhood: [customer.neighborhood],
            complement: [customer.complement],
            zipCodeDelivery: [
                customer.zipCodeDelivery,
                Validators.compose([
                    Validators.minLength(8),
                    Validators.maxLength(8)
                ])
            ],
            stateDelivery: [customer.stateDelivery],
            cityDelivery: [customer.cityDelivery],
            addressDelivery: [customer.addressDelivery],
            neighborhoodDelivery: [customer.neighborhoodDelivery],
            complementDelivery: [customer.complementDelivery],
            paymentConditionId: [customer.paymentConditionId],
            paymentMethodId: [customer.paymentMethodId],
            priceListdId: [customer.priceListdId],
            creditLimit: [customer.creditLimit, [Validators.min(0)]],
            creditLimitExpirationDate: [
                customer.creditLimitExpirationDate,
                [Validators.required]
            ]
        });
    }
}
