import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared/shared.module';
import { CustomerDetailComponent } from './customer-detail.component';
import { RegistrationDataComponent } from './registration-data/registration-data.component';

@NgModule({
  declarations: [
    CustomerDetailComponent,
    RegistrationDataComponent
  ],
  imports: [
    SharedModule
  ]
})
export class CustomerDetailModule { }
