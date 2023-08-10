import { NgModule } from '@angular/core';
import { HomeMyBillingModule } from './home-my-billing/home-my-billing.module';
import { MyBillingsRoutingModule } from './my-billings-routing.module';

@NgModule({
  imports: [
    HomeMyBillingModule,
    MyBillingsRoutingModule
  ]
})
export class MyBillingsModule { }
