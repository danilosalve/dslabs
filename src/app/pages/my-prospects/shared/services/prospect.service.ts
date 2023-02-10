import { Injectable, Injector } from '@angular/core';
import { CustomerType } from '@app/pages/my-customers/shared/enum/customer-type.enum';
import { ResourceStatus } from '@app/shared/enum/resource-status.enum';
import { BaseResourceServiceFull } from '@app/shared/services/base-resource-full.service';
import { PoTableColumn } from '@po-ui/ng-components';
import { Prospect } from '../../shared/interfaces/prospect';

@Injectable({
    providedIn: 'root'
})
export class ProspectService extends BaseResourceServiceFull<Prospect> {
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
                width: '20%'
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
        return [];
    }
    constructor(protected override injector: Injector) {
        super('api/prospects/', injector);
    }
}
