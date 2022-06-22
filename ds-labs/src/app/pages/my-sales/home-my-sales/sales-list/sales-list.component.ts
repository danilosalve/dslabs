import { Component, Injector } from '@angular/core';
import { PoPageAction, PoTableAction } from '@po-ui/ng-components';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CustomerService } from 'src/app/pages/my-customers/shared/services/customer.service';
import { BaseResourceList } from 'src/app/shared/components/base-resource-list.component';
import { SalesBrw } from '../../shared/interfaces/sales';
import { SalesService } from '../../shared/services/sales.service';

@Component({
  selector: 'app-SalesList',
  templateUrl: './sales-list.component.html',
})
export class SalesListComponent extends BaseResourceList<SalesBrw> {

  constructor(
    protected salesService: SalesService,
    protected override injector: Injector,
    protected customerService: CustomerService
  ) {
    super(injector, salesService, 'Meus Pedidos');
  }

  getActions(): PoPageAction[] {
    return [{ label: 'Novo', url: 'sales/new', icon: 'po-icon-plus' }];
  }

  getTableActions(): PoTableAction[] {
    return [
      {
        // action: this.onShowSale.bind(this),
        icon: 'po-icon-eye',
        label: 'Visualizar',
      },
      {
        //action: this.onDelete.bind(this),
        icon: 'po-icon-delete',
        label: 'Excluir',
      },
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
          sales.forEach((sale) => {
            this.customerService
              .getById(sale.customerId)
              .pipe(
                map((customer) => ({
                  ...sale,
                  customerName: customer.name,
                })),
                tap((saleBrw) => {
                  this.items = this.items.concat(saleBrw);
                }),
                tap(() => (this.isLoading = false))
              )
              .subscribe(() => {
                if (search) {
                  this.items = this.items.filter(
                    (sales) =>
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

}
