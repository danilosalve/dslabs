import { Injectable, Injector } from '@angular/core';
import { PoSelectOption } from '@po-ui/ng-components';
import { PaymentCondition } from './../interfaces/payment-condition';
import { BaseResourceService } from './base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentConditionsService extends BaseResourceService<PaymentCondition> {
  constructor(protected override injector: Injector) {
    super('api/paymentConditions/', injector);
  }

  getComboOptions(payments: PaymentCondition[]): PoSelectOption[] {
    return payments.map(payment => ({
      value: payment.id,
      label: payment.description
    }));
  }
}
