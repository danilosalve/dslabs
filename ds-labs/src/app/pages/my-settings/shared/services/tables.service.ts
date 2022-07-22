import { Injectable, Injector } from '@angular/core';
import { BaseResourceServiceFull } from '@app/shared/services/base-resource-full.service';
import {
  PoNotificationService, PoTableColumn,
  PoTableColumnIcon
} from '@po-ui/ng-components';
import { Table } from '../interfaces/table';
import { TableStatus } from '../interfaces/table-status.enum';

@Injectable({
    providedIn: 'root'
})
export class TablesService extends BaseResourceServiceFull<Table> {
    constructor(
        protected override injector: Injector,
        protected poNotification: PoNotificationService
    ) {
        super('api/tables', injector);
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
                        value: TableStatus.ACTIVATED,
                        color: 'color-11',
                        label: 'Ativo'
                    },
                    {
                        value: TableStatus.DISABLED,
                        color: 'color-07',
                        label: 'Inativo'
                    }
                ]
            },
            {
                property: 'id',
                label: 'Código',
                type: 'number',
                width: '5%',
                visible: false
            },
            {
                property: 'table',
                label: 'Tabela',
                type: 'string',
                width: '10%'
            },
            {
                property: 'description',
                label: 'Descrição',
                type: 'string',
                width: '70%'
            },
            {
                property: 'status',
                label: 'Sincronizar?',
                type: 'icon',
                width: '9%',
                icons: [
                    {
                        action: (value: Table, row: PoTableColumnIcon) => {
                            this.handleClickSync(value, row);
                        },
                        icon: 'po-icon-upload-cloud',
                        value: '1',
                        tooltip: 'Ativar Sincronismo',
                        color: 'color-10',
                        disabled: (value: Table) => !this.canEditTheTable(value)
                    },
                    {
                        action: (value: Table, row: PoTableColumnIcon) => {
                            this.handleClickSync(value, row);
                        },
                        icon: 'po-icon po-icon-no-signal',
                        tooltip: 'Desativar Sincronismo',
                        value: '2',
                        color: 'color-07',
                        disabled: (value: Table) => !this.canEditTheTable(value)
                    }
                ]
            }
        ];
    }

    private handleClickSync(value: Table, row: PoTableColumnIcon): void {
        if (this.canEditTheTable(value)) {
            value.status =
                value.status === TableStatus.ACTIVATED
                    ? TableStatus.DISABLED
                    : TableStatus.ACTIVATED;
            this.put(value, value.id);
        } else {
          this.poNotification.error('Tabela não pode ser Editada')
        }
    }

    private canEditTheTable(table: Table): boolean {
        return table.canEdit;
    }
}
