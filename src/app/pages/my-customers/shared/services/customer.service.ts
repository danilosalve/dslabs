import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { ResourceStatus } from '@app/shared/enum/resource-status.enum';
import { DocumentPipe } from '@app/shared/pipe/document.pipe';
import { BaseResourceServiceFull } from '@app/shared/services/base-resource-full.service';
import {
  PoComboFilter,
  PoComboOption,
  PoDynamicViewField,
  PoSelectOption,
  PoTableColumn
} from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { catchError, filter, map, retry } from 'rxjs/operators';
import { CustomerType } from '../enum/customer-type.enum';
import { Customer } from '../interface/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseResourceServiceFull<Customer> implements PoComboFilter {
  constructor(
    protected override injector: Injector,
    protected documentPipe: DocumentPipe
  ) {
    super('api/customers/', injector);
  }

  getByName(name: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiPath}?name=${name}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        throw error;
      })
    );
  }

  getByDocument(document: string): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(`${this.apiPath}?document=${document}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw error;
        })
      );
  }

  getColumns(): PoTableColumn[] {
    return [
      {
        property: 'status',
        label: 'Status',
        type: 'label',
        width: '8%',
        labels: [
          {
            value: ResourceStatus.active,
            color: 'color-11',
            label: 'Ativo'
          },
          {
            value: ResourceStatus.inactive,
            color: 'color-07',
            label: 'Inativo'
          }
        ]
      },
      { property: 'id', label: 'Código', type: 'link', width: '8%', action: (value: any, row: { id: any; }) => this.navigateTo('/customers/view', row.id) },
      {
        property: 'store',
        label: 'Loja',
        type: 'number',
        width: '5%',
        visible: false
      },
      {
        property: 'name',
        label: 'Nome Cliente',
        type: 'string',
        width: '25%'
      },
      {
        property: 'document',
        label: 'CPF/CNPJ',
        type: 'columnTemplate',
        width: '10%'
      },
      { property: 'state', label: 'UF', type: 'string', width: '10%' },
      {
        property: 'city',
        label: 'Municipio',
        type: 'string',
        width: '15%'
      },
      {
        property: 'registerDate',
        label: 'Dt. Nasc/Registro',
        type: 'date',
        width: '15%',
        visible: false
      },
      {
        property: 'lastPurchase',
        label: 'Ult. Compra',
        type: 'date',
        width: '15%'
      },
      {
        property: 'customerType',
        label: 'Tipo',
        type: 'subtitle',
        width: '5%',
        subtitles: [
          {
            value: CustomerType.FINAL_COSTUMER,
            color: 'color-10',
            label: 'Cons. Final',
            content: 'F'
          },
          {
            value: CustomerType.DEALER,
            color: 'color-07',
            label: 'Revendedor',
            content: 'R'
          },
          {
            value: CustomerType.EXPORT,
            color: 'color-08',
            label: 'Exportação',
            content: 'EX'
          },
          {
            value: CustomerType.RURAL_PRODUCER,
            color: 'color-03',
            label: 'Produtor Rural',
            content: 'P'
          }
        ]
      }
    ];
  }

  getHeadersForExcel(): string[] {
    return [
      'Código',
      'Nome/Razão Social',
      'CPF/CNPJ',
      'Dt. Cadastro',
      'Tipo de Pessoa',
      'Status',
      'UF',
      'Municipio',
      'Endereço',
      'Bairro',
      'CEP',
      'Complemento',
      'Loja',
      'Tp. Cliente',
      'Nome Fantasia',
      'Nome Contato',
      'E-Mail',
      'Telefone Comercial',
      'Vlr. Limite de Crédito',
      'Dt. Limite de Crédito',
      'Ult. Compra',
      'UF de Entrega',
      'Municipio de Entrega',
      'Endereço de Entrega',
      'Bairro de Entrega',
      'CEP de Entrega',
      'Complemento de Entrega',
      'Cond. Pagamento',
      'Metodo de Pagamento',
      'Tabela de Preço'
    ];
  }

  getComboOptions(customers: Customer[]): PoSelectOption[] {
    return customers.map(customer => ({
      value: customer.id,
      label: customer.name
    }));
  }

  getViewFields(): PoDynamicViewField[] {
    return [
      {
        property: 'id',
        label: 'Código',
        key: true,
        divider: 'Dados do Cliente'
      },
      {
        property: 'registerDate',
        label: 'Dt. Nascimento/Registro',
        type: 'date'
      },
      {
        property: 'statusDescription',
        label: 'Status',
        tag: true,
        color: 'color-11',
        icon: 'po-icon-ok'
      },
      {
        property: 'name',
        label: 'Nome',
        type: 'string'
      },
      { property: 'document', label: 'CNPJ/CPF', type: 'string' },
      {
        property: 'customerTypeDescription',
        label: 'Tp. Cliente',
        type: 'string'
      },
      {
        property: 'address',
        label: 'Endereço',
        type: 'string',
        divider: 'Endereço'
      },
      {
        property: 'neighborhood',
        label: 'Bairro',
        type: 'string'
      },
      {
        property: 'zipCode',
        label: 'CEP',
        type: 'string'
      },
      {
        property: 'state',
        label: 'UF',
        type: 'string'
      },
      { property: 'city', label: 'Municipio', type: 'string' },
      {
        property: 'lastPurchase',
        label: 'Ult. Compra',
        type: 'date',
        divider: 'Dados Financeiros'
      }
    ];
  }

  transformDocument(document: string): string {
    return this.documentPipe.transform(document);
  }

  getFilteredData(
    params: any,
    filterParams?: any
  ): Observable<PoComboOption[]> {
    return this.getByName(params.value).pipe(
      map(customers =>
        customers.filter(c => c.status === ResourceStatus.active)
      ),
      map(customers =>
        customers.map(customer => ({
          label: customer.name,
          value: customer.id
        }))
      )
    );
  }

  getObjectByValue(
    value: string | number,
    filterParams?: any
  ): Observable<PoComboOption> {
    return this.getById(value).pipe(
      filter(customer => customer.status === ResourceStatus.active),
      map(customer => ({
        label: customer.name,
        value: customer.id
      }))
    );
  }
}
