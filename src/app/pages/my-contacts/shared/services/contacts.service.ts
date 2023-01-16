import { Injectable, Injector } from '@angular/core';
import { ResourceStatus } from '@app/shared/enum/resource-status.enum';
import { DocumentPipe } from '@app/shared/pipe/document.pipe';
import { PhonePipe } from '@app/shared/pipe/phone.pipe';
import { BaseResourceServiceFull } from '@app/shared/services/base-resource-full.service';
import { PoTableColumn } from '@po-ui/ng-components';
import { Contact } from '../interfaces/contact';

@Injectable({
    providedIn: 'root'
})
export class ContactsService extends BaseResourceServiceFull<Contact> {
    constructor(
        protected override injector: Injector,
        protected documentPipe: DocumentPipe,
        protected phonePipe: PhonePipe
    ) {
        super('api/contacts/', injector);
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
            { property: 'id', label: 'Código', type: 'number', width: '8%' },
            {
                property: 'name',
                label: 'Nome',
                type: 'string',
                width: '25%'
            },
            {
                property: 'document',
                label: 'CPF/CNPJ',
                type: 'columnTemplate',
                width: '10%'
            },
            {
                property: 'phone',
                label: 'Telefone',
                type: 'columnTemplate',
                width: '15%'
            },
            {
                property: 'email',
                label: 'E-Mail',
                type: 'string',
                width: '25%'
            }
        ];
    }

    getHeadersForExcel(): string[] {
        return [
          'Código',
          'Nome',
          'CPF/CPNJ',
          'Dt. Nascimento/Registro',
          'Tp Pessoa',
          'Status',
          'UF',
          'Municipio',
          'Endereço',
          'Bairro',
          'CEP',
          'Complemento',
          'Telefone',
          'Email',
          'Departamento'
        ];
    }

    transformDocument(document: string): string {
        return this.documentPipe.transform(document);
    }

    transformPhone(phone: number): string {
        return this.phonePipe.transform(phone);
    }
}
