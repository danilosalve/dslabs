import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { SalesStatus } from '@app/pages/my-sales/shared/interfaces/sales-status.enum';
import { SalesService } from '@app/pages/my-sales/shared/services/sales.service';
import { PoTableColumn } from '@po-ui/ng-components';
import { SalesBrw } from './../../../my-sales/shared/interfaces/sales';

@Component({
    selector: 'app-home-sales-table',
    templateUrl: './home-sales-table.component.html'
})
export class HomeSalesTableComponent implements OnInit, OnChanges {
    @Input() sales: SalesBrw[] = [];
    @Input() isLoading = false;
    columns: PoTableColumn[] = [];

    constructor(
        protected customerService: CustomerService,
        protected salesService: SalesService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.getSalesWithCustomerName();
    }

    ngOnInit(): void {
        this.getColumns();
    }

    getColumns(): void {
        this.columns = this.salesService.getColumns();
        const index = this.findColumnIndexByProperty('subTotal');
        if (index >= 0) {
          this.columns.splice(index);
        }
    }

    findColumnIndexByProperty(property: string): number {
      return this.columns.findIndex(i => i.property === property);
  }

    getSalesWithCustomerName(): void {
        this.isLoading = true;
        this.sales = this.sales.filter(s => s.status !== SalesStatus.Closed);
        this.sales
            .map(sale => {
                this.customerService
                    .getById(sale.customerId!)
                    .subscribe(customer => (sale.customerName = customer.name));
            })
            .map(() => (this.isLoading = false));
    }
}
