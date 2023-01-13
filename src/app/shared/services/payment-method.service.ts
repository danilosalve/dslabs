import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import {
  PoComboFilter,
  PoComboOption
} from '@po-ui/ng-components';
import { catchError, map, Observable, retry } from 'rxjs';
import { PaymentMethod } from '../interfaces/payment-method';
import { BaseResourceService } from './base-resource.service';

@Injectable({
    providedIn: 'root'
})
export class PaymentMethodService extends BaseResourceService<PaymentMethod> implements PoComboFilter {
    constructor(protected override injector: Injector) {
        super('api/paymentMethods/', injector);
    }

    getByDescription(name: string): Observable<PaymentMethod[]> {
        return this.http
            .get<PaymentMethod[]>(`${this.apiPath}?description=${name}`)
            .pipe(
                retry(2),
                catchError((error: HttpErrorResponse) => {
                    throw error;
                })
            );
    }

    getFilteredData(params: any, filterParams?: any): Observable<PoComboOption[]> {
      return this.getByDescription(params.value)
      .pipe(
        map(payments => payments.map(payment => ({
          value: payment.id,
            label: payment.description
        })))
      )
    }

    getObjectByValue(value: string | number, filterParams?: any): Observable<PoComboOption> {
      return this.getById(value)
      .pipe(
        map(payment => ({
          value: payment.id,
          label: payment.description
        }))
      )
    }
}
