import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseResourceList } from '@app/shared/components/base/base-resource-list.component';
import { PoPageAction, PoTableAction } from '@po-ui/ng-components';
import { Table } from '../../shared/interfaces/table';
import { TablesService } from '../../shared/services/tables.service';

@Component({
    selector: 'app-settings-list',
    templateUrl: './settings-list.component.html'
})
export class SettingsListComponent extends BaseResourceList<Table> {
    constructor(
        protected tableService: TablesService,
        protected override injector: Injector,
        protected router: Router
    ) {
        super(injector, tableService);
    }

    getActions(): PoPageAction[] {
        return [];
    }

    getTableActions(): PoTableAction[] {
        return [
            {
                action: this.onEditTable.bind(this),
                icon: 'po-icon-edit',
                label: 'Editar',
                disabled: this.canEditTable.bind(this)
            }
        ];
    }

    handleSearch(resource: Table[], search: string): Table[] {
        return resource.filter(
            table =>
                table.table
                    .toUpperCase()
                    .includes(search.toLocaleUpperCase()) ||
                table.description
                    .toUpperCase()
                    .includes(search.toLocaleUpperCase())
        );
    }

    onEditTable(table: Table): void {
        this.isLoading = true;
        this.router.navigate(['settings/edit', table.id]);
    }

    canEditTable(table: Table): boolean {
      return !table.canEdit;
    }
}
