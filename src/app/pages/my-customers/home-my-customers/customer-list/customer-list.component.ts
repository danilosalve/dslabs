import { Component, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseResourceList } from '@app/shared/components/base/base-resource-list.component';
import { PoModalComponent, PoPageAction } from '@po-ui/ng-components';
import { CustomerPerson } from '../../shared/interface/customer-person.enum';
import { CustomerService } from '../../shared/services/customer.service';
import { Customer } from './../../shared/interface/customer';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html'
})
export class CustomerListComponent extends BaseResourceList<Customer> {
    @ViewChild(PoModalComponent, { static: true })
    poModalNewCustomer!: PoModalComponent;
    isFormInvalid = false;
    formNewCustomer = {
        typeOfPerson: CustomerPerson.LEGAL,
        customerLink: false,
        customerId: undefined,
        copyCustomer: false
    };
    constructor(
        protected customerService: CustomerService,
        protected override injector: Injector,
        protected router: Router
    ) {
        super(injector, customerService);
    }

    handleSearch(resource: Customer[], search: string): Customer[] {
        return resource.filter(
            customers =>
                customers.id?.toString().includes(search) ||
                customers.name?.toLowerCase().includes(search.toLowerCase())
        );
    }

    getActions(): PoPageAction[] {
        return [
            {
                label: 'Cadastrar Cliente',
                action: () => this.poModalNewCustomer.open(),
                icon: 'po-icon-plus'
            }
        ];
    }

    onShowCustomer(customer: Customer): void {
        this.isLoading = true;
        this.router.navigate(['customers/view', customer.id]);
    }

    confirmCustomerInclusion(): void {
        const params = {
            queryParams: this.formNewCustomer
        }

        if (!this.isFormInvalid) {
            if (this.formNewCustomer.customerId !== undefined && this.formNewCustomer.customerId !== null) {
                this.router.navigate([
                    'customers/new',
                    this.formNewCustomer.customerId
                ], params);
            } else {
                this.router.navigate(['customers/new'], params);
            }
        } else {
            this.poNotification.error(
                'O código do Cliente não foi preenchido'
            );
        }
    }

    handleInclusionForm($event: { form: any; invalidForm: boolean }): void {
        this.formNewCustomer = $event.form;
        this.isFormInvalid = $event.invalidForm;
    }
}
