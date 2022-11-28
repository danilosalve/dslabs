import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  PoDynamicFormField, PoDynamicFormFieldChanged, PoDynamicFormValidation
} from '@po-ui/ng-components';
import { Sales } from '../../shared/interfaces/sales';
import { SalesService } from '../../shared/services/sales.service';

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
    protected salesService: SalesService
  ) {}

  ngOnInit(): void {
    this.onInitFields();
  }

  onInitFields(): void {
    this.fields = this.salesService.getFormFields();
    this.isLoading = false;
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
