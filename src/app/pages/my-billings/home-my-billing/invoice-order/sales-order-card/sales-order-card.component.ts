import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SalesBrw } from '@app/pages/my-sales/shared/interfaces/sales';
import { IStatusCardSalesOrder } from '@app/pages/my-sales/shared/interfaces/status-card-sales-order';
import { StatusCardSalesOrder } from '@app/pages/my-sales/shared/model/status-card-sales-order';

@Component({
  selector: 'app-sales-order-card',
  templateUrl: './sales-order-card.component.html',
  styleUrls: ['./sales-order-card.component.css']
})
export class SalesOrderCardComponent {
  @Input() items: SalesBrw[] = [];
  readonly statusCardSalesOrder = new StatusCardSalesOrder();

  constructor(protected _currencyPipe: CurrencyPipe) { }

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
    return this._currencyPipe.transform(value);
  }

  getSaleViewUrl(id: number): string {
    return `/sales/view/${id.toString()}`;
  }
}
