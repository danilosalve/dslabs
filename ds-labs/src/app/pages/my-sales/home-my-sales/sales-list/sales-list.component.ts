import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { BaseResourceList } from '@app/shared/components/base-resource-list.component';
import { PoDialogService, PoPageAction, PoTableAction } from '@po-ui/ng-components';
import { of } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { Sales, SalesBrw } from '../../shared/interfaces/sales';
import { SalesStatus } from '../../shared/interfaces/sales-status.enum';
import { SalesService } from '../../shared/services/sales.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html'
})
export class SalesListComponent extends BaseResourceList<SalesBrw> {

  constructor(
    protected salesService: SalesService,
    protected override injector: Injector,
    protected customerService: CustomerService,
    protected router: Router,
    protected poDialog: PoDialogService
  ) {
    super(injector, salesService, 'Meus Pedidos');
  }

  getActions(): PoPageAction[] {
    return [{ label: 'Novo', url: 'sales/new', icon: 'po-icon-plus' }];
  }

  getTableActions(): PoTableAction[] {
    return [
      {
        action: this.onShowSale.bind(this),
        icon: 'po-icon-eye',
        label: 'Visualizar'
      },
      {
        action: this.onEditSale.bind(this),
        icon: 'po-icon-edit',
        label: 'Editar'
      },
      {
        action: this.onDelete.bind(this),
        icon: 'po-icon-delete',
        label: 'Excluir'
      }
    ];
  }

  override getItems(search?: string): void {
    let salesBrw: SalesBrw[] = [];

    this.items$ = this.salesService
      .getAll()
      .pipe(
        tap(() => {
          this.items = [];
          this.isLoading = true;
        }),
        switchMap((sales: SalesBrw[]) => {
          sales.forEach(sale => {
            this.customerService
              .getById(sale.customerId!)
              .pipe(
                map(customer => ({
                  ...sale,
                  customerName: customer.name
                })),
                tap(saleBrw => {
                  this.items = this.items.concat(saleBrw);
                }),
                tap(() => (this.isLoading = false))
              )
              .subscribe(() => {
                if (search) {
                  this.items = this.items.filter(
                    sales =>
                      sales.id?.toString().includes(search) ||
                      sales.customerName
                        ?.toLowerCase()
                        .includes(search.toLowerCase())
                  );
                }
              });
          });
          return of(salesBrw);
        })
      )
      .subscribe();
  }

  handleSearch(resource: SalesBrw[], search: string): SalesBrw[] {
    throw new Error('Method not implemented.');
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
    if (sales.status !== SalesStatus.Closed) {
      this.isLoading = true;
      this.salesService
      .delete(sales.id ? sales.id : 0)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: () => {
          const index = this.items.findIndex( res => res.id === sales.id);
          if (index > -1) {
            this.poNotification.success(`Pedido ${sales.id?.toString()} excluído com sucesso`)
            this.getItems();
          } else {
            this.handleErrorDelete(sales)
          }
        },
        error: () => this.handleErrorDelete(sales)
      });
    } else {
      this.poDialog.alert({title: 'Não permitido', message: 'Não é permitida a exclusão de Pedidos de Vendas Encerrados'});
    }
  }

  handleErrorDelete(sales: Sales): void {
    this.poNotification.error(`Falha ao excluir pedido ${sales.id?.toString()}`)
  }
}
