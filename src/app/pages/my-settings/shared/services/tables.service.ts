import { Injectable, Injector } from '@angular/core';
import { BaseResourceServiceFull } from '@app/shared/services/base-resource-full.service';
import {
  PoDynamicFormField,
  PoNotificationService, PoTableColumn,
  PoTableColumnIcon
} from '@po-ui/ng-components';
import { Table } from '../interfaces/table';
import { TableStatus } from '../interfaces/table-status.enum';

@Injectable({
    providedIn: 'root'
})
export class TablesService extends BaseResourceServiceFull<Table> {

    getHeadersForExcel(): string[] {
      return ['Código', 'Descrição', 'Status', 'Pode Editar?', 'Filtro'];
    }
    constructor(
        protected override injector: Injector,
        protected poNotification: PoNotificationService
    ) {
        super('api/tables/', injector);
    }

    getColumns(): PoTableColumn[] {
        return [
            {
                property: 'status',
                label: 'Status',
                type: 'label',
                width: '15%',
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
            }/*,
            {
                property: 'status',
                label: 'Sincronizar?',
                visible: false,
                type: 'icon',
                width: '15%',
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
            }*/
        ];
    }

    getFormFields(): PoDynamicFormField[] {
      return [
        {
          label: 'Tabela',
          property: 'table',
          type: 'String',
          required: true,
          placeholder: 'Alias da Tabela',
          help: "Alias da Tabela",
          disabled: true
        },
        {
          label: 'Descrição',
          property: 'description',
          type: 'String',
          required: true,
          placeholder: 'Descrição da Tabela',
          help: 'Descrição da Tabela',
          disabled: true
        },
        {
          label: 'Sincronizar?',
          visible: false,
          property: 'isSync',
          type: 'Boolean',
          help: 'Habilitar/Desabilitar o Sincronismo',
          booleanTrue: 'Habilitado',
          booleanFalse: 'Desabilitado',
          disabled: false
        }
      ];
    }

    private handleClickSync(value: Table, row: PoTableColumnIcon): void {
        if (this.canEditTheTable(value)) {
          const action = value.status === TableStatus.ACTIVATED ? 'Desabilitado' : 'Habilitado';
            value.status =
                value.status === TableStatus.ACTIVATED
                    ? TableStatus.DISABLED
                    : TableStatus.ACTIVATED;
            this.put(value, value.id).subscribe({
              next: () => this.poNotification.success(`Sincronismo ${action} com sucesso`),
              error: () => this.poNotification.error(`Falha ao ${action} Sincronismo`)
            });
        } else {
          this.poNotification.error('Tabela não pode ser Editada')
        }
    }

    private canEditTheTable(table: Table): boolean {
        return table.canEdit;
    }
}
