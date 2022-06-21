import { Injectable, Injector } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Customer } from '../interface/customer';
import { CustomerStatus } from './../interface/customer-status.enum';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseResourceService<Customer> {
  constructor(protected override injector: Injector) {
    super('api/customers/', injector);
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
}
