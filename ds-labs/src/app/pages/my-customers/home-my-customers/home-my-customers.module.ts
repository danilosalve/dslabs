import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared/shared.module';
import { CustomerListComponent } from './customer-list/customer-list.component';

@NgModule({
  declarations: [CustomerListComponent],
  imports: [SharedModule],
})
export class HomeMyCustomersModule {}
