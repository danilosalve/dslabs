import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { PaymentMethodService } from '@app/shared/services/payment-method.service';
import {
  PoDynamicFormField, PoNotificationService, PoSelectOption
} from '@po-ui/ng-components';
import { forkJoin } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Sales } from '../../shared/interfaces/sales';
import { SalesService } from '../../shared/services/sales.service';
import { CarrierService } from './../../../../shared/services/carrier.service';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
})
export class GeneralDataComponent implements OnInit {
  @Input() sales: Sales | undefined;
  @Input() dynamicForm: NgForm | undefined;
  fields: Array<PoDynamicFormField> = [];
  isLoading = true;

  constructor(
    protected carrierService: CarrierService,
    protected customerService: CustomerService,
    protected paymentService: PaymentMethodService,
    protected salesService: SalesService,
    protected poNotification: PoNotificationService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.getFields();
  }

  getFields(): void {
    let carrierList: Array<PoSelectOption>;
    let customerList: Array<PoSelectOption>;
    let paymentList: Array<PoSelectOption>;

    forkJoin({
      carriers: this.carrierService.getAll(),
      customers: this.customerService.getAll(),
      payments: this.paymentService.getAll(),
    })
      .pipe(
        tap(() => (this.isLoading = true)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response) => {
          customerList = this.customerService.getComboOptions(
            response.customers
          );
          paymentList = this.paymentService.getComboOptions(response.payments);
          carrierList = this.carrierService.getComboOptions(response.carriers);
          this.fields = this.salesService.getFormFields();
          this.setFieldOptions('customerId', customerList);
          this.setFieldOptions('paymentMethodId', paymentList);
          this.setFieldOptions('carrierId', carrierList);
        },
        error: err => {
          console.error(err);
          this.handleError('Ocorreu um erro ao inicializar o formulario');
        }
      });
  }

  findFieldByProperty(property: string): number {
    return this.fields.findIndex(f => f.property === property)
  }

  setFieldOptions(property: string, options: any[]): void {
    const index = this.findFieldByProperty(property);
    if (index > -1) {
      this.fields[index].options = options;
    } else {
      this.handleError(`Campo ${property} não localizado`);
    }
  }

  handleError(text: string): void {
    this.poNotification.error(text);
    this.router.navigate(['sales']);
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }
}
