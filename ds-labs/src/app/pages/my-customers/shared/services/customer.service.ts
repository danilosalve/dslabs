import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceServiceFull } from '@app/shared/services/base-resource-full.service';
import { PoSelectOption, PoTableColumn } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Customer } from '../interface/customer';
import { CustomerStatus } from './../interface/customer-status.enum';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseResourceServiceFull<Customer> {
  constructor(protected override injector: Injector) {
    super('api/customers/', injector);
  }

  getByName(name: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiPath}?name=${name}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        throw (error);
      })
    )
  }

  getColumns(): PoTableColumn[] {
    return [
      { property: 'status', label: 'Status', type: 'label', labels: [
        { value: CustomerStatus.active, color: 'color-11', label: 'Ativo' },
        { value: CustomerStatus.inactive, color: 'color-07', label: 'Inativo' },
      ]},
      { property: 'id', label: 'Código', type: 'number', width: '8%' },
      { property: 'name', label: 'Nome Cliente', type: 'string' },
      { property: 'document', label: 'CPF/CNPJ', type: 'string' },
      { property: 'state', label: 'UF', type: 'string' },
      { property: 'city', label: 'Municipio', type: 'string' },
    ];
  }

  getComboOptions(customers: Customer[]): PoSelectOption[] {
    return customers.map(customer => ({
      value: customer.id,
      label: customer.name
    }))
  }
}
