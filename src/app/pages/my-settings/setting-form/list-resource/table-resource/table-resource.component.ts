import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { Customer } from '@app/pages/my-customers/shared/interface/customer';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { BaseResourceTable } from '@app/shared/components/base/base-resource-table.component';
import { PoNotificationService, PoTableAction, PoTableComponent } from '@po-ui/ng-components';

@Component({
    selector: 'app-table-resource',
    templateUrl: './table-resource.component.html'
})
export class TableResourceComponent extends BaseResourceTable<Customer> {
    @Output() selectedItem = new EventEmitter();
    @Output() allSelected = new EventEmitter();
    isAllSelected = false;
    maxNumberOfCheckedItems = 2;

    @ViewChild('poTable') poTable!: PoTableComponent;


    constructor(
        protected customerService: CustomerService,
        protected override injector: Injector,
        protected poNotification: PoNotificationService
    ) {
        super(injector, customerService);
    }

    transformDocument(document: string): string {
        return this.customerService.transformDocument(document);
    }

    getActions(): PoTableAction[] {
        return [];
    }

    handleSelectedResource(row: any): void {
      this.isAllSelected = false;
      const countNumberOfCheckedItems = this.poTable.getSelectedRows().length;

      if (this.maxNumberOfCheckedItems < countNumberOfCheckedItems) {
        this.poTable.unselectRowItem(row);
        this.poNotification.warning('Limite de registros selecionados')
      } else {
        this.handleDisclaimerEvent(row.id, row.$selected);
      }
    }

    handleDisclaimerEvent(id: number, isSelected: boolean): void {
      this.selectedItem.emit({id, isSelected});
    }

    handleAllSelected(rows: any[]): void {
      const selected: { id: number; isSelected: boolean; isAllSelected: boolean }[] = [];
      this.isAllSelected = !this.isAllSelected;
      rows.forEach(row => {
        selected.push({id: row.id, isSelected: row.$selected, isAllSelected: this.isAllSelected});
      });
      this.allSelected.emit(selected);
    }

    override setHeight(): void {
      let elements = [];

      elements.push(this.getElementHeightById('.po-menu-mobile po-clickable'));
      elements.push(this.getElementHeightById('.po-button'));
      elements.push(this.getElementHeightById('.po-page-header'));
      elements.push(this.getElementHeightById('.toolbar'));
      elements.push(this.getElementHeightById('.po-table-subtitle-footer-container'));

      elements.push(this.getElementHeightById('.disclaimer-form'));
      elements.push(this.getElementHeightById('.po-divider'));
      this.height = this.calculateHeight(elements) - 250;
    }
}
