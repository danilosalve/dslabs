import { Component, Injector } from '@angular/core';
import { BaseResourceDetail } from '@app/shared/components/base-resource-detail.component';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { Customer } from '../shared/interface/customer';
import { CustomerModel } from '../shared/model/customer-model';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent extends BaseResourceDetail {
    customer: Customer = new CustomerModel();

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
