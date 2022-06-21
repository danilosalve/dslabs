import { NgModule } from '@angular/core';
import { HomeMySalesModule } from './home-my-sales/home-my-sales.module';
import { MySalesRoutingModule } from './my-sales-routing.module';

@NgModule({
  imports: [
    MySalesRoutingModule,
    HomeMySalesModule
  ]
})
export class MySalesModule { }
