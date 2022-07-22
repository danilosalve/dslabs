import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared/shared.module';
import { SaleStatusDetailsComponent } from './sales-list/sale-status-details/sale-status-details.component';
import { SalesListComponent } from './sales-list/sales-list.component';

@NgModule({
  declarations: [SalesListComponent, SaleStatusDetailsComponent],
  imports: [SharedModule]
})
export class HomeMySalesModule {}
