import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { PoComboOption } from '@po-ui/ng-components';
import { catchError, map, Observable, retry } from 'rxjs';
import { PaymentCondition } from './../interfaces/payment-condition';
import { BaseResourceService } from './base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentConditionsService extends BaseResourceService<PaymentCondition> {
  constructor(protected override injector: Injector) {
    super('api/paymentConditions/', injector);
  }

  getByDescription(name: string): Observable<PaymentCondition[]> {
    return this.http
        .get<PaymentCondition[]>(`${this.apiPath}?description=${name}`)
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
