import { Component, EventEmitter, Output } from '@angular/core';
import { BaseResourceListView } from '@app/shared/components/base/base-resource-list-view.component';
import { PoListViewAction } from '@po-ui/ng-components';
import { Table } from './../../../shared/interfaces/table';
import { TableStatus } from './../../../shared/interfaces/table-status.enum';

@Component({
    selector: 'app-setting-list-view',
    templateUrl: './setting-list-view.component.html'
})
export class SettingListViewComponent extends BaseResourceListView<Table> {
    @Output() editTable = new EventEmitter();
    @Output() showTable = new EventEmitter();

    constructor() {
        super();
    }

    getActions(): PoListViewAction[] {
        return [
            {
                action: this.handleEditTable.bind(this),
                icon: 'po-icon-edit',
                label: 'Editar',
                disabled: this.canEditTable.bind(this)
            }
        ];
    }

    canEditTable(table: Table): boolean {
        return !table.canEdit;
    }

    handleEditTable(table: Table): void {
        this.editTable.emit(table);
    }

    transformStatus(status: string): {description: string, color: string} {
      switch (status){
        case TableStatus.ACTIVATED:
          return {
            description: 'Ativo',
            color: 'color-11'
          }
        case TableStatus.DISABLED:
          return {
            description: 'Inativo',
            color: 'color-07'
          }
          default:
            return {
              description: 'Não informado',
              color: ''
            }
      }
    }
}
