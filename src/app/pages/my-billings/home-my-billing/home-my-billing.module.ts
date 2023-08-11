import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { InvoiceOrderComponent } from './invoice-order/invoice-order.component';
import { SalesOrderCardComponent } from './invoice-order/sales-order-card/sales-order-card.component';

@NgModule({
  declarations: [
    InvoiceOrderComponent,
    SalesOrderCardComponent
  ],
  imports: [
    SharedModule,
    CdkDropList,
    CdkDrag
  ]
})
export class HomeMyBillingModule { }
