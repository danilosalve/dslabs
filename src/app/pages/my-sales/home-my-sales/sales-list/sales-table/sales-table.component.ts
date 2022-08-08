import { SalesService } from '@app/pages/my-sales/shared/services/sales.service';
import { BaseResourceTable } from '@app/shared/components/base/base-resource-table.component';
import { Component, Output, EventEmitter, Injector } from '@angular/core';
import { SalesBrw } from '@app/pages/my-sales/shared/interfaces/sales';
import {
    PoTableAction,
    PoTableRowTemplateArrowDirection
} from '@po-ui/ng-components';

@Component({
    selector: 'app-sales-table',
    templateUrl: './sales-table.component.html'
})
export class SalesTableComponent extends BaseResourceTable<SalesBrw> {
    @Output() showSale = new EventEmitter();
    @Output() editSale = new EventEmitter();
    @Output() deleteSale = new EventEmitter();

    templateDirection = PoTableRowTemplateArrowDirection.Left;

    constructor(
      protected override injector: Injector,
      protected salesService: SalesService
    ) {
      super(injector, salesService);
    }


    getActions(): PoTableAction[] {
        return [
            {
                action: this.handleShowSale.bind(this),
                icon: 'po-icon-eye',
                label: 'Visualizar'
            },
            {
                action: this.handleEditSale.bind(this),
                icon: 'po-icon-edit',
                label: 'Editar'
            },
            {
                action: this.handleDeleteSale.bind(this),
                icon: 'po-icon-delete',
                label: 'Excluir'
            }
        ];
    }

  handleShowSale(Sale: SalesBrw): void {
    this.showSale.emit(Sale);
  }

  handleEditSale(Sale: SalesBrw): void {
    this.editSale.emit(Sale);
  }

  handleDeleteSale(Sale: SalesBrw): void {
    this.deleteSale.emit(Sale);
  }
}
