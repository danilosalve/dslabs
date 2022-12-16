import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared/shared.module';
import { CustomersFormModule } from './../customers-form/customers-form.module';
import { CustomerListViewComponent } from './customer-list/customer-list-view/customer-list-view.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerTableComponent } from './customer-list/customer-table/customer-table.component';

@NgModule({
  declarations: [CustomerListComponent, CustomerTableComponent, CustomerListViewComponent],
  imports: [SharedModule, CustomersFormModule]
})
export class HomeMyCustomersModule {}
