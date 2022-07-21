import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared/shared.module';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SaleStatusDetailsComponent } from './sales-list/sale-status-details/sale-status-details.component';


@NgModule({
  declarations: [SalesListComponent, SaleStatusDetailsComponent],
  imports: [SharedModule]
})
export class HomeMySalesModule {}
