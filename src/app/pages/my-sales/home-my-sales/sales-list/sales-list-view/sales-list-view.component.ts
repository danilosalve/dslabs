import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { IStatusCardSalesOrder } from '@app/pages/my-sales/shared/interfaces/status-card-sales-order';
import { StatusCardSalesOrder } from '@app/pages/my-sales/shared/model/status-card-sales-order';
import { BaseResourceListView } from '@app/shared/components/base/base-resource-list-view.component';
import { PoListViewAction } from '@po-ui/ng-components';
import { SalesBrw } from './../../../shared/interfaces/sales';

@Component({
    selector: 'app-sales-list-view',
    templateUrl: './sales-list-view.component.html'
})
export class SalesListViewComponent extends BaseResourceListView<SalesBrw> {
    @Output() editSale = new EventEmitter();
    @Output() deleteSale = new EventEmitter();
    readonly statusCardSalesOrder = new StatusCardSalesOrder();
    constructor(private currencyPipe: CurrencyPipe) {
        super();
    }

    transformStatus(key: keyof StatusCardSalesOrder): IStatusCardSalesOrder {
      return this.statusCardSalesOrder[key] ?? {
        description: 'Não informado',
        color: ''
      }
    }

    transformDate(issueDate: Date): string {
        const date =
            typeof issueDate.toLocaleDateString === 'function'
                ? issueDate
                : new Date(issueDate);
        return date ? date.toLocaleDateString() : '';
    }

    transformSubTotal(value: string): string | null {
        return this.currencyPipe.transform(value);
    }

    getActions(): PoListViewAction[] {
        return [
            {
                action: this.handleEditSale.bind(this),
                icon: 'po-icon-edit',
                label: 'Editar'
            },
            {
                action: this.handleDeleteSale.bind(this),
                icon: 'po-icon-delete',
                label: 'Excluir',
                type: 'danger'
            }
        ];
    }

    handleEditSale(Sale: SalesBrw): void {
        this.editSale.emit(Sale);
    }

    handleDeleteSale(Sale: SalesBrw): void {
        this.deleteSale.emit(Sale);
    }
}
