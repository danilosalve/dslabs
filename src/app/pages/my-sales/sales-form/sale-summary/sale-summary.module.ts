import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { TotalModule } from '../../total/total.module';
import { SaleSummaryWithDeliveryComponent } from './sale-summary-with-delivery/sale-summary-with-delivery.component';
import { SaleSummaryWithPaymentComponent } from './sale-summary-with-payment/sale-summary-with-payment.component';
import { SaleSummaryWithProductsComponent } from './sale-summary-with-products/sale-summary-with-products.component';
import { SaleSummaryComponent } from './sale-summary.component';
import { SalesSummaryWithSellerComponent } from './sales-summary-with-seller/sales-summary-with-seller.component';

@NgModule({
  declarations: [
    SaleSummaryComponent,
    SaleSummaryWithDeliveryComponent,
    SaleSummaryWithPaymentComponent,
    SaleSummaryWithProductsComponent,
    SalesSummaryWithSellerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TotalModule
  ],
  exports: [
    SaleSummaryComponent
  ]
})
export class SaleSummaryModule { }
