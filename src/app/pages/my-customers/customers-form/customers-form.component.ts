import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { BaseResourceForm } from '@app/shared/components/base/base-resource-form.component';
import {
  PoBreadcrumb,
  PoDynamicFormField,
  PoStepperComponent
} from '@po-ui/ng-components';
import { finalize, take } from 'rxjs/operators';
import { Customer } from '../shared/interface/customer';
import { CustomerPerson } from '../shared/interface/customer-person.enum';
import { CustomerStatus } from '../shared/interface/customer-status.enum';
import { CustomerType } from '../shared/interface/customer-type';
import { CustomerModel } from '../shared/model/customer-model';
import { CustomerService } from '../shared/services/customer.service';
import { CustomerFormService } from './shared/services/customer-form.service';

@Component({
    selector: 'app-customers-form',
    templateUrl: './customers-form.component.html',
    styles: []
})
export class CustomersFormComponent extends BaseResourceForm implements OnInit {
    @ViewChild(PoStepperComponent) poStepperComponent!: PoStepperComponent;
    customer: Customer = new CustomerModel(
        0,
        1,
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
    formCustomer!: UntypedFormGroup;
    stepper = 1;
    constructor(
        protected override injector: Injector,
        protected customerService: CustomerService,
        protected customerFormService: CustomerFormService
    ) {
        super(injector, 'customers', true);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.onInitCustomer();
        this.onInitForm();
    }

    getBreadCrumb(): PoBreadcrumb {
        return {
            items: [
                { label: 'Meus Clientes', action: this.handleBack.bind(this) },
                { label: 'Novo Cliente' }
            ]
        };
    }

    onSubmit(): void {
        const customer = this.formCustomer.getRawValue() as Customer;

        if (this.isEdit()) {
            this.customerService.put(customer, customer.id).subscribe({
                next: () => {
                    this.poNotification.success(
                        'Cliente atualizado com sucesso!!!'
                    );
                    this.handleBack();
                },
                error: () =>
                    this.poNotification.error('Falha ao alterar cliente')
            });
        } else {
            this.customerService.create(customer).subscribe({
                next: () => {
                    this.poNotification.success(
                        'Cliente cadastrado com sucesso!!!'
                    );
                    this.handleBack();
                },
                error: () =>
                    this.poNotification.error('Falha ao incluir cliente')
            });
        }
    }
    getFields(): PoDynamicFormField[] {
        return [];
    }

    nextStep(): void {
        if (this.canMoveToNextPage()) {
            this.poStepperComponent.next();
        }
    }

    previousStep(): void {
        if (this.canMoveToPreviousPage()) {
            this.poStepperComponent.previous();
        }
    }

    canMoveToNextPage(): boolean {
        return this.stepper < this.poStepperComponent.poSteps.length;
    }

    canMoveToPreviousPage(): boolean {
        return this.stepper > 1;
    }

    getStepValue(step: string): number {
        switch (step) {
            case 'Identificação':
                return 1;
            case 'Contato':
                return 2;
            case 'Endereços':
                return 3;
            case 'Financeiro':
                return 4;
            default:
                return 0;
        }
    }

    handleChangeStep(currentActiveStep: any): void {
        this.stepper = this.getStepValue(currentActiveStep.label);
    }

    onInitCustomer(): void {
        if (!this.isEdit()) {
            const customerLink = this.getQueryParamMapBoolean('customerLink');
            const copyCustomer = this.getQueryParamMapBoolean('copyCustomer');

            if (customerLink) {
                this.activatedroute.params.subscribe(
                    res => (this.resourceId = res['id'])
                );
            }

            if (copyCustomer) {
                this.customer = this.getResourceByActivatedroute('customer');
                this.customer.lastPurchase = new Date();
                this.customer.registerDate = new Date();
                this.customer.creditLimitExpirationDate = new Date();
                this.customer.document = '';
            } else {
                this.customer.typePerson = this.getTypeOfPerson(
                    this.activatedroute.snapshot.queryParamMap.get(
                        'typeOfPerson'
                    ) || ''
                );
            }

            this.fetchNextCustomerCode(
                customerLink ? Number.parseInt(this.resourceId + '') : 0,
                copyCustomer
            );
        } else {
            this.customer = this.getResourceByActivatedroute('customer');
        }
    }

    onInitForm(): void {
        this.formCustomer = this.customerFormService.getCustomerForm(
            this.customer
        );
    }

    fetchNextCustomerCode(id: number, isCopyCustomer: boolean): void {
        this.customerService
            .getAll()
            .pipe(
                take(1),
                finalize(() => {
                    this.formCustomer.get('id')?.setValue(this.customer.id);
                    this.formCustomer
                        .get('store')
                        ?.setValue(this.customer.store);
                    if (isCopyCustomer) {
                        this.formCustomer
                            .get('document')
                            ?.setValue(this.customer.document);
                    }
                })
            )
            .subscribe({
                next: customers => {
                    customers.forEach(c => {
                      if (c.id === id) {
                        this.customer.document = c.document;
                        this.customer.store = ++c.store;
                      }
                      this.customer.id = ++c.id;
                    });
                }
            });
    }

    getTypeOfPerson(type: string): CustomerPerson {
        switch (type) {
            case 'J':
                return CustomerPerson.LEGAL;
            default:
                return CustomerPerson.NATURAL;
        }
    }

    getQueryParamMapBoolean(param: string): boolean {
        return this.activatedroute.snapshot.queryParamMap.get(param) === 'true';
    }
}
