import { NgModule } from '@angular/core';
import { HomeMyCustomersModule } from './home-my-customers/home-my-customers.module';
import { MyCustomersRoutingModule } from './my-customers-routing.module';

@NgModule({
  imports: [
    MyCustomersRoutingModule,
    HomeMyCustomersModule
  ]
})
export class MyCustomersModule { }
