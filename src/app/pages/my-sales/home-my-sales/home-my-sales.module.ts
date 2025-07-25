import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared/shared.module';
import { SaleStatusDetailsComponent } from './sales-list/sale-status-details/sale-status-details.component';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SalesTableComponent } from './sales-list/sales-table/sales-table.component';
import { SalesListViewComponent } from './sales-list/sales-list-view/sales-list-view.component';

@NgModule({
  declarations: [SalesListComponent, SaleStatusDetailsComponent, SalesTableComponent, SalesListViewComponent],
  imports: [SharedModule]
})
export class HomeMySalesModule {}
