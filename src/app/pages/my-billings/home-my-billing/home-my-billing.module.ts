import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { InvoiceOrderComponent } from './invoice-order/invoice-order.component';

@NgModule({
  declarations: [
    InvoiceOrderComponent
  ],
  imports: [
    SharedModule,
    CdkDropList,
    CdkDrag
  ]
})
export class HomeMyBillingModule { }
