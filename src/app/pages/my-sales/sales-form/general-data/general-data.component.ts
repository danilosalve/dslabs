import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { PaymentMethodService } from '@app/shared/services/payment-method.service';
import {
  PoDynamicFormField, PoDynamicFormFieldChanged, PoDynamicFormValidation, PoNotificationService, PoSelectOption
} from '@po-ui/ng-components';
import { forkJoin } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Sales } from '../../shared/interfaces/sales';
import { SalesService } from '../../shared/services/sales.service';
import { CarrierService } from './../../../../shared/services/carrier.service';
import { PaymentConditionsService } from './../../../../shared/services/payment-conditions.service';
import { PriceListService } from './../../../../shared/services/price-list.service';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html'
})
export class GeneralDataComponent implements OnInit {
  @Input() sales: Sales | undefined;
  @Input() dynamicForm: NgForm | undefined;
  @Input() isMobile = false;
  @Output() getForm = new EventEmitter();
  fields: Array<PoDynamicFormField> = [];
  isLoading = true;
  validateFields: string[] = ['paymentMethodId', 'carrierId', 'priceListId'];

  constructor(
    protected carrierService: CarrierService,
    protected customerService: CustomerService,
    protected paymentService: PaymentMethodService,
    protected paymentConditionsService: PaymentConditionsService,
    protected priceListService: PriceListService,
    protected salesService: SalesService,
    protected poNotification: PoNotificationService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.getFields();
  }

  getFields(): void {
    let carrierList: PoSelectOption[];
    let customerList: PoSelectOption[];
    let paymentList: PoSelectOption[];
    let conditionsList: PoSelectOption[];
    let priceList: PoSelectOption[];

    forkJoin({
      carriers: this.carrierService.getAll(),
      customers: this.customerService.getAll(),
      payments: this.paymentService.getAll(),
      paymentConditions: this.paymentConditionsService.getAll(),
      priceLists: this.priceListService.getAll()
    })
      .pipe(
        tap(() => (this.isLoading = true)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: response => {
          customerList = this.customerService.getComboOptions(
            response.customers
          );
          paymentList = this.paymentService.getComboOptions(response.payments);
          carrierList = this.carrierService.getComboOptions(response.carriers);
          priceList = this.priceListService.getComboOptions(response.priceLists);
          conditionsList = this.paymentConditionsService.getComboOptions(response.paymentConditions);
          this.fields = this.salesService.getFormFields();
          this.setFieldOptions('customerId', customerList);
          this.setFieldOptions('paymentMethodId', paymentList);
          this.setFieldOptions('carrierId', carrierList);
          this.setFieldOptions('priceListId', priceList);
          this.setFieldOptions('paymentConditionsId', conditionsList);
        },
        error: () => {
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

  formEmitter(form: NgForm) {
    this.dynamicForm = form;
    this.getForm.emit(form);
  }

  onChangeFields(changedValue: PoDynamicFormFieldChanged): PoDynamicFormValidation {
    let formValidation: PoDynamicFormValidation = {};
    const isDisablePayment = (changedValue.value.paymentMethodId === 1 || changedValue.value.paymentMethodId === 2 || changedValue.value.paymentMethodId === 3 );

    if (changedValue.property === 'paymentMethodId') {
      const fieldPayment = this.getFieldByName('paymentConditionsId');
      if (isDisablePayment ) {
        fieldPayment.disabled = true;
        formValidation = {
          value: { paymentConditionsId: 1 }
        }
      } else {
        fieldPayment.disabled = false;
      }
      formValidation.fields = [fieldPayment];
    }

    if (changedValue.property === 'priceListId') {
      const fieldPayment = this.getFieldByName('paymentConditionsId');
      const fieldMethod = this.getFieldByName('paymentMethodId');
      if (changedValue.value.priceListId === 3 ) {
        formValidation = {
          value: { paymentConditionsId: 1, paymentMethodId: 1 }
        }
      }

      fieldPayment.disabled = changedValue.value.priceListId === 3 || isDisablePayment;
      fieldMethod.disabled = changedValue.value.priceListId === 3;
      formValidation.fields = [fieldPayment, fieldMethod];
    }

    if (changedValue.property === 'carrierId') {
      const fieldFreight = this.getFieldByName('freight');
      const fieldTypeOfFreight = this.getFieldByName('typeOfFreight');
      fieldFreight.disabled = changedValue.value.carrierId === 6;
      fieldTypeOfFreight.disabled = changedValue.value.carrierId === 6;

      if (changedValue.value.carrierId === 6 ) {
        fieldFreight
        formValidation = {
          value: { typeOfFreight: 'S', freight: 0 }
        }
      }

      formValidation.fields = [fieldFreight, fieldTypeOfFreight];
    }
    return formValidation
  }

  getFieldByName(property: string): PoDynamicFormField  {
    let field: PoDynamicFormField = {
      property
    }
    let index = this.fields.findIndex(f => f.property === property);
    return index ? this.fields[index] : field
  }
}
