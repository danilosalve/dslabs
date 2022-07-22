import { Component, Injector } from '@angular/core';
import { BaseResourceList } from '@app/shared/components/base-resource-list.component';
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
    protected override injector: Injector) {
    super(injector, tableService);
  }

  getActions(): PoPageAction[] {
    return [];
  }

  getTableActions(): PoTableAction[] {
    return [];
  }

  handleSearch(resource: Table[], search: string): Table[] {
    throw new Error('Method not implemented.');
  }
}
