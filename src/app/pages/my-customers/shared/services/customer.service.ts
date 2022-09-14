import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { DocumentPipe } from '@app/shared/pipe/document.pipe';
import { BaseResourceServiceFull } from '@app/shared/services/base-resource-full.service';
import {
  PoDynamicViewField,
  PoSelectOption,
  PoTableColumn
} from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Customer } from '../interface/customer';
import { CustomerType } from '../interface/customer-type';
import { CustomerStatus } from './../interface/customer-status.enum';

@Injectable({
    providedIn: 'root'
})
export class CustomerService extends BaseResourceServiceFull<Customer> {
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

    getColumns(): PoTableColumn[] {
        return [
            {
                property: 'status',
                label: 'Status',
                type: 'label',
                width: '8%',
                labels: [
                    {
                        value: CustomerStatus.active,
                        color: 'color-11',
                        label: 'Ativo'
                    },
                    {
                        value: CustomerStatus.inactive,
                        color: 'color-07',
                        label: 'Inativo'
                    }
                ]
            },
            { property: 'id', label: 'Código', type: 'number', width: '8%' },
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
                key: true
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
                type: 'string',
                divider: 'Dados do Cliente'
            },
            { property: 'document', label: 'CNPJ/CPF', type: 'string' },
            { property: 'state', label: 'UF', type: 'string' },
            { property: 'city', label: 'Municipio', type: 'string' },
            {
                property: 'customerTypeDescription',
                label: 'Tp. Cliente',
                type: 'string'
            },
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
}
