import { NgModule } from '@angular/core';
import { DocumentPipe } from './../../shared/pipe/document.pipe';
import { CustomerDetailModule } from './customer-detail/customer-detail.module';
import { CustomersFormModule } from './customers-form/customers-form.module';
import { HomeMyCustomersModule } from './home-my-customers/home-my-customers.module';
import { MyCustomersRoutingModule } from './my-customers-routing.module';
import { CustomerGuard } from './shared/guards/customer.guard';

@NgModule({
  imports: [
    MyCustomersRoutingModule,
    HomeMyCustomersModule,
    CustomerDetailModule,
    CustomersFormModule
  ],
  providers: [CustomerGuard, DocumentPipe]
})
export class MyCustomersModule { }
