import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { BaseResourceList } from '@app/shared/components/base/base-resource-list.component';
import {
  PoDialogService,
  PoPageAction
} from '@po-ui/ng-components';
import 'lodash';
import { Observable, of } from 'rxjs';
import { concatMap, finalize, map, tap } from 'rxjs/operators';
import { Sales, SalesBrw } from '../../shared/interfaces/sales';
import { SalesStatus } from '../../shared/interfaces/sales-status.enum';
import { SalesService } from '../../shared/services/sales.service';
declare var _:any;
@Component({
    selector: 'app-sales-list',
    templateUrl: './sales-list.component.html'
})
export class SalesListComponent extends BaseResourceList<SalesBrw> {
    sales: Sales[] = [];
    constructor(
        protected salesService: SalesService,
        protected override injector: Injector,
        protected customerService: CustomerService,
        protected router: Router,
        protected poDialog: PoDialogService
    ) {
        super(injector, salesService);
    }

    getActions(): PoPageAction[] {
        return [{ label: 'Novo', url: 'sales/new', icon: 'po-icon-plus' }];
    }

    override getItems(search?: string): void {
        let salesBrw: SalesBrw[] = [];

        this.items$ = this.salesService
            .getAll()
            .pipe(
                tap(() => this.resetResource()),
                map(sales => _.sortBy(sales, (el:Sales) => - new Date(el.issueDate))),
                concatMap((sales: SalesBrw[]) => {
                    sales.map(sale => {
                        const subTotal$ = this.getSubTotal(sale.id!);
                        const customer$ = this.getCustomer(sale);
                        customer$
                            .pipe(
                                concatMap(() => subTotal$),
                                finalize(() => (this.isLoading = false))
                            )
                            .subscribe(res => {
                                if (search) {
                                    this.sales = this.handleSearch(
                                        this.sales,
                                        search
                                    );
                                }
                                this.items = this.sales;
                                this.handleSubTotal(res.id!, res.subTotal);
                            });
                    });
                    return of(salesBrw);
                })
            )
            .subscribe();
    }

    handleSearch(resource: SalesBrw[], search: string): SalesBrw[] {
        return resource.filter(
            sales =>
                sales.id?.toString().includes(search) ||
                sales.customerName?.toLowerCase().includes(search.toLowerCase())
        );
    }

    onShowSale(sale: Sales): void {
        this.isLoading = true;
        this.router.navigate(['sales/view', sale.id]);
    }

    onEditSale(sale: Sales): void {
        this.isLoading = true;
        this.router.navigate(['sales/edit', sale.id]);
    }

    onDelete(sales: Sales): void {
        if (this.canEditOrDelete(sales)) {
            this.isLoading = true;
            this.salesService
                .delete(sales.id ? sales.id : 0)
                .pipe(finalize(() => (this.isLoading = false)))
                .subscribe({
                    next: () => {
                        this.handleDelete(sales);
                    },
                    error: () => this.handleErrorDelete(sales)
                });
        } else {
            this.poDialog.alert({
                title: 'Não permitido',
                message:
                    'Não é permitida a exclusão de Pedidos de Vendas Encerrados'
            });
        }
    }

    handleDelete(sale: Sales): void {
        const index = this.findItemIndexById(sale.id!);
        if (this.hasSalesItem(index)) {
            this.poNotification.success(
                `Pedido ${sale.id?.toString()} excluído com sucesso`
            );
            this.getItems();
        } else {
            this.handleErrorDelete(sale);
        }
    }

    handleErrorDelete(sales: Sales): void {
        this.poNotification.error(
            `Falha ao excluir pedido ${sales.id?.toString()}`
        );
    }

    findItemIndexById(id: number): number {
        return this.items.findIndex(i => i.id === id);
    }

    hasSalesItem(index: number): boolean {
        return index >= 0;
    }

    handleSubTotal(id: number, subTotal: number): void {
        const index = this.findItemIndexById(id);

        if (this.hasSalesItem(index)) {
            this.items[index].subTotal = subTotal;
        }
    }

    resetResource(): void {
        this.items = [];
        this.sales = [];
        this.isLoading = true;
    }

    getCustomer(sale: Sales): Observable<SalesBrw> {
        return this.customerService.getById(sale.customerId!).pipe(
            map(customer => ({
                ...sale,
                customerName: customer.name
            })),
            tap(saleBrw => {
                this.sales = this.sales.concat(saleBrw);
            })
        );
    }

    getSubTotal(id: number): Observable<{ id: number; subTotal: number }> {
        return this.salesService.getSubtotalWithSaleId(id).pipe(
            map(res => ({
                id: id,
                subTotal: res
            }))
        );
    }

    canEditOrDelete(sale: Sales): boolean {
      return sale.status !== SalesStatus.Closed;
    }
}
