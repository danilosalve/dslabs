import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { PoDatepickerIsoFormat } from '@po-ui/ng-components';
import { Customer } from '../../shared/interface/customer';
import { PaymentConditionsService } from './../../../../shared/services/payment-conditions.service';
import { PaymentMethodService } from './../../../../shared/services/payment-method.service';
import { PriceListService } from './../../../../shared/services/price-list.service';

@Component({
  selector: 'app-financial-data',
  templateUrl: './financial-data.component.html',
  styles: [
  ]
})
export class FinancialDataComponent {
  @Input() customer!: Customer;
  @Input() formCustomer!: UntypedFormGroup;
  isoFormat = PoDatepickerIsoFormat.Extended;
  minDate = new Date();
  constructor(
    protected paymentConditionsService: PaymentConditionsService,
    protected paymentMethodService: PaymentMethodService,
    protected priceListService: PriceListService
  ) { }
}
