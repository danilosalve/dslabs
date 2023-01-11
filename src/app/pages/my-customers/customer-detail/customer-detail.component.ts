import { Component, Injector } from '@angular/core';
import { BaseResourceDetail } from '@app/shared/components/base/base-resource-detail.component';
import { ResourceStatus } from '@app/shared/enum/resource-status.enum';
import { TypeOfPerson } from '@app/shared/enum/type-of-person.enum';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { CustomerType } from '../shared/enum/customer-type.enum';
import { Customer } from '../shared/interface/customer';
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
        TypeOfPerson.LEGAL,
        '',
        CustomerType.FINAL_COSTUMER,
        '',
        '',
        '',
        '',
        '',
        '',
        ResourceStatus.inactive,
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
