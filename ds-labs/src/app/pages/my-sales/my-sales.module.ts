import { NgModule } from '@angular/core';
import { HomeMySalesModule } from './home-my-sales/home-my-sales.module';
import { MySalesRoutingModule } from './my-sales-routing.module';
import { SalesFormModule } from './sales-form/sales-form.module';

@NgModule({
  imports: [
    MySalesRoutingModule,
    HomeMySalesModule,
    SalesFormModule
  ]
})
export class MySalesModule { }
