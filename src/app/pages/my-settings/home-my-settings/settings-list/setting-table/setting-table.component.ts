import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { Table } from '@app/pages/my-settings/shared/interfaces/table';
import { TablesService } from '@app/pages/my-settings/shared/services/tables.service';
import { BaseResourceTable } from '@app/shared/components/base/base-resource-table.component';
import { PoTableAction } from '@po-ui/ng-components';

@Component({
    selector: 'app-setting-table',
    templateUrl: './setting-table.component.html'
})
export class SettingTableComponent extends BaseResourceTable<Table> {
    @Output() editTable = new EventEmitter();

    constructor(
      protected override injector: Injector,
      protected tableService: TablesService
    ) {
      super(injector, tableService);
    }

    getActions(): PoTableAction[] {
        return [
            {
                action: this.handleEditTable.bind(this),
                icon: 'po-icon-edit',
                label: 'Editar',
                disabled: this.canEditTable.bind(this)
            }
        ];
    }

    handleEditTable(table: Table): void {
      this.editTable.emit(table);
    }

    canEditTable(table: Table): boolean {
      return !table.canEdit;
    }
}
