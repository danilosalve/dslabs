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

  drop(event: { previousContainer: { data: any[], id: string }; container: { data: any[]; }; previousIndex: number; currentIndex: number; }) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const sale = event.container.data[event.currentIndex] as Sales;
      if (event.previousContainer.id === 'Abertos') {
        event.container.data[event.currentIndex].status = SalesStatus.Approved;
        this.updateSalesStatus(sale, sale.id!)
      } else if (event.previousContainer.id === 'Aprovados') {
        event.container.data[event.currentIndex].status = SalesStatus.Closed;
        this.updateSalesStatus(sale, sale.id!);
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

    this.items.push(sale);
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

  updateSalesStatus(sale: Sales, id: number): void {
    const message = sale.status === SalesStatus.Approved ? 'aprovado' : 'atualizado';
    this.salesService.put(sale, id).subscribe({
      next: () =>  this.poNotificationService.success(`Pedido ${message} com sucesso!`),
      error: () => this.poNotificationService.error('Falha ao atualizar pedido de Venda')
    })
  }
}
