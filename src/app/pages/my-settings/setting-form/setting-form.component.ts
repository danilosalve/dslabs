import { Component, Injector, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BaseResourceForm } from '@app/shared/components/base/base-resource-form.component';
import { PoBreadcrumb, PoDisclaimer, PoDynamicFormField, PoStepperOrientation } from '@po-ui/ng-components';
import { clone } from 'ramda';
import { finalize, tap } from 'rxjs/operators';
import { Field } from '../shared/interfaces/field';
import { TableStatus } from '../shared/interfaces/table-status.enum';
import { Table } from './../shared/interfaces/table';
import { TableModel } from './../shared/model/table.model';
import { TablesService } from './../shared/services/tables.service';

@Component({
  templateUrl: './setting-form.component.html'
})
export class SettingFormComponent extends BaseResourceForm implements OnInit {
  orientation = PoStepperOrientation.Vertical;
  fieldsTable: Field[] = [];
  table: Table = new TableModel();
  dynamicForm: NgForm | undefined;
  disclaimerFilters: PoDisclaimer[] = [];
  quickFilter = '';
  advancedFilter = '';

  constructor(protected override injector: Injector, private tableService: TablesService) {
    super(injector, 'settings', false);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.setOrientation();
    this.onInitResources();
  }

  setOrientation(): void {
    this.orientation = this.isMobile ? PoStepperOrientation.Horizontal : PoStepperOrientation.Vertical;
  }

  getBreadCrumb(): PoBreadcrumb {
    return {
      items: [
        { label: 'Minhas Configurações', action: this.handleBack.bind(this) },
        { label: 'Editar Configurações' }
      ]
    };
  }

  onSubmit(): void {
    this.table.status = this.table.isSync ? TableStatus.ACTIVATED : TableStatus.DISABLED;
    this.tableService.put(this.table, this.table.id)
    .pipe(
      tap(() => {
        this.isDisableSubmit = true;
        this.isLoading = true;
      }),
      finalize(() => {
        this.isDisableSubmit = false;
        this.isLoading = false;
      })
    )
    .subscribe({
      next: () => {
        this.poNotification.success('Configuração atualizada com sucesso.');
        this.handleBack();
      },
      error: () => this.poNotification.error('Falha ao Salvar Configuração')
    })
  }

  getFields(): PoDynamicFormField[] {
    return this.tableService.getFormFields();
  }

  onInitResources(): void {
    if (this.isEdit()) {
      this.table = this.getTableWithTransform();
      this.fieldsTable = this.getResourceByActivatedroute('fields');
      this.titlePage = `Editar Configurações dos ${this.table.description}`;
      if (this.table.filter) {
        this.toDisclaimer(this.table.filter);
      }
    }
  }

  getTableWithTransform(): Table {
    const table: Table = this.getResourceByActivatedroute('table');
    table.isSync = table.status === TableStatus.ACTIVATED ? true : false;
    return table;
  }

  setForm(form: NgForm) {
    this.dynamicForm = form;
  }

  handleAdvancedFilter(disclaimer: PoDisclaimer[]): void {
    this.disclaimerFilters = clone(disclaimer);
    this.disclaimerFilters.map(item => item.hideClose = true);
    this.table.filter = JSON.stringify(this.disclaimerFilters);
    this.isDisableSubmit = false;
  }

  toDisclaimer(filter: string): void {
    this.isDisableSubmit = false;
    this.disclaimerFilters = JSON.parse(filter);
  }

  handleDisclaimer(disclaimerFilters: PoDisclaimer[]): void {
    this.disclaimerFilters = clone(disclaimerFilters);
    this.disclaimerFilters.map(item => item.hideClose = true);
    this.table.filter = JSON.stringify(this.disclaimerFilters);
    this.isDisableSubmit = false;
  }

  handleQuickFilter(quickFilter: {isSelected: boolean, field: string}): void {
    this.quickFilter = quickFilter.isSelected ? quickFilter.field : '';
  }

  handleFilter($event: any): void {
    this.advancedFilter = $event;
  }
}
