import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared/shared.module';
import { SalesListComponent } from './sales-list/sales-list.component';


@NgModule({
  declarations: [SalesListComponent],
  imports: [SharedModule]
})
export class HomeMySalesModule {}
