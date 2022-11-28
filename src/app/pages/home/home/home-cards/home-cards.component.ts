import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Sales } from '@app/pages/my-sales/shared/interfaces/sales';
import { SalesService } from '@app/pages/my-sales/shared/services/sales.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { SalesStatus } from './../../../my-sales/shared/interfaces/sales-status.enum';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.css']
})
export class HomeCardsComponent implements OnChanges, OnDestroy {
  @Input() sales: Sales[] = [];
  @Input() isLoading = true;
  @Output() changeSalesFilter = new EventEmitter();
  lastUpdated = new Date().toLocaleTimeString()
  items$ = new Subscription();

  salesInfo = {
    total: 0,
    closed: 0,
    opened: 0,
    blocked: 0
  }
  constructor(protected salesService: SalesService, protected poNotifican: PoNotificationService) { }

  ngOnDestroy(): void {
    this.items$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sales.length > 0) {
      this.getSalesWithTotal();
    }
  }

  handleEventFilter(status?: string): void {
    this.changeSalesFilter.emit(status);
  }

  getSalesWithTotal(): void {
    this.isLoading = true;
    this.sales
    .map(sale => this.handleSubTotal(sale))
    .map(() => this.isLoading = false)
  }

  handleSubTotal(sale: Sales): void {
    this.items$ = this.salesService.getSubtotalWithSaleId(sale.id!)
    .subscribe({
      next: total => {
        if (sale.status === SalesStatus.Open) {
          this.salesInfo.opened += total;
        } else if (sale.status === SalesStatus.Blocked) {
          this.salesInfo.blocked += total;
        } else if (sale.status === SalesStatus.Closed) {
          this.salesInfo.closed += total;
        }

        this.salesInfo.total += total;
      },
      error: () => this.poNotifican.error(`Não foi possivel obter o total do Pedido ${sale.id!}`)
    })
  }
}
