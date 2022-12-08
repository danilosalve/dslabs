import { Component, Injector } from '@angular/core';
import { BaseResourceDetail } from '@app/shared/components/base/base-resource-detail.component';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { Customer } from '../shared/interface/customer';
import { CustomerPerson } from '../shared/interface/customer-person.enum';
import { CustomerStatus } from '../shared/interface/customer-status.enum';
import { CustomerType } from '../shared/interface/customer-type';
import { CustomerModel } from '../shared/model/customer-model';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent extends BaseResourceDetail {
    customer: Customer = new CustomerModel(
        0,
        0,
        '',
        CustomerPerson.LEGAL,
        '',
        CustomerType.FINAL_COSTUMER,
        '',
        '',
        '',
        '',
        '',
        '',
        CustomerStatus.inactive,
        new Date(),
        new Date(),
        '',
        '',
        0
    );

    constructor(protected override injector: Injector) {
        super(injector, 'customers/');
    }

    getBreadCrumb(): PoBreadcrumb {
        return {
            items: [
                { label: 'Meus Clientes', link: '/customers' },
                { label: this.titlePage }
            ]
        };
    }
    onInitResources(): void {
        this.customer = this.activatedroute.snapshot.data['customer'];
    }
}
