import { Injectable, Injector } from '@angular/core';
import { PoSelectOption, PoTableColumn } from '@po-ui/ng-components';
import { PaymentMethod } from '../interfaces/payment-method';
import { BaseResourceService } from './base-resource.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodService extends BaseResourceService<PaymentMethod> {
  constructor(protected override injector: Injector) {
    super('api/paymentMethod/', injector);
  }

  getComboOptions(payments: PaymentMethod[]): PoSelectOption[] {
    return payments.map((payment) => ({
      value: payment.id,
      label: payment.description,
    }));
  }

  getColumns(): PoTableColumn[] {
    throw new Error('Method not implemented.');
  }
}
