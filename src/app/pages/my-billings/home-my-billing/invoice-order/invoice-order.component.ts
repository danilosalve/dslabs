import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CurrencyPipe } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { Sales, SalesBrw } from '@app/pages/my-sales/shared/interfaces/sales';
import { SalesStatus } from '@app/pages/my-sales/shared/interfaces/sales-status.enum';
import { SalesService } from '@app/pages/my-sales/shared/services/sales.service';
import { BaseResourceList } from '@app/shared/components/base/base-resource-list.component';
import { PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { finalize, map, mergeMap, take, tap } from 'rxjs/operators';
import { CustomerService } from './../../../my-customers/shared/services/customer.service';

@Component({
  selector: 'app-invoice-order',
  templateUrl: './invoice-order.component.html',
  styleUrls: ['./invoice-order.component.css']
})
export class InvoiceOrderComponent extends BaseResourceList<SalesBrw> implements OnInit {
  open: SalesBrw[] = [];
  approved: SalesBrw[] = [];
  invoiced: SalesBrw[] = [];

  constructor(
    protected customerService: CustomerService,
    protected salesService: SalesService,
    protected override injector: Injector,
    protected currencyPipe: CurrencyPipe,
    protected poNotificationService: PoNotificationService
  ) {
    super(injector, salesService);
  }

  override ngOnInit(): void {
    this.onInitInvoices();
    super.onInitPage();
  }

  override getActions(): PoPageAction[] {
    return []
  }
  override handleSearch(resource: any[], search: string): any[] {
    throw new Error('Method not implemented.');
  }

  drop(event: { previousContainer: { data: any[] , id: string }; container: { data: any[]; }; previousIndex: number; currentIndex: number; }) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      if (event.previousContainer.id === 'Abertos') {
        this.poNotificationService.success('Pedido aprovado com sucesso!');
        event.container.data[event.currentIndex].status = SalesStatus.Approved;
      } else if (event.previousContainer.id === 'Aprovados') {
        this.poNotificationService.success('Pedido Faturado com sucesso!');
        event.container.data[event.currentIndex].status = SalesStatus.Closed;
      }
    }
  }

  onInitInvoices(): void {
    this.items$ = this.salesService.getAll()
      .pipe(
        tap(() => this.isLoading = true),
        mergeMap(sales => {
          sales.forEach(sale => {
            this.getCustomerName(sale)
              .pipe(
                mergeMap(s => this.getSubTotal(s)),
                finalize(() => this.isLoading = false)
              )
              .subscribe(res => this.handleSalesWithCustomer(res))
          })
          return sales
        })
      ).
      subscribe();
  }

  handleSalesWithCustomer(sale: Sales): void {
    if (sale.status === SalesStatus.Approved) {
      this.approved.push(sale);
    }
    if (sale.status === SalesStatus.Closed) {
      this.invoiced.push(sale);
    }
    if (sale.status != SalesStatus.Approved && sale.status != SalesStatus.Closed) {
      this.open.push(sale);
    }
  }

  getCustomerName(sale: Sales): Observable<SalesBrw> {
    return this.customerService.getById(sale.customerId!).pipe(
      map(customer => ({
        ...sale,
        customerName: customer.name
      })),
      take(1)
    );
  }

  getSubTotal(sale: Sales): Observable<SalesBrw> {
    return this.salesService.getSubtotalWithSaleId(sale.id!).pipe(
      map(res => ({
        ...sale,
        subTotal: res
      })),
      take(1)
    );
  }

  transformStatus(status: string): { description: string; color: string } {
    switch (status) {
      case SalesStatus.Open:
        return {
          description: 'Aberto',
          color: 'color-11'
        };
      case SalesStatus.Closed:
        return {
          description: 'Encerrado',
          color: 'color-07'
        };
      case SalesStatus.Blocked:
        return {
          description: 'Bloqueado',
          color: 'color-08'
        };
      case SalesStatus.Approved:
        return {
          description: 'Aprovado',
          color: 'color-02'
        };
      default:
        return {
          description: 'Não informado',
          color: ''
        };
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
}
