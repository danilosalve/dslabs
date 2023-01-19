import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared/shared.module';
import { AddressComponent } from './address/address.component';
import { ContactComponent } from './contacts/contact/contact.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CustomerDetailComponent } from './customer-detail.component';
import { FinancialDataComponent } from './financial-data/financial-data.component';
import { RegistrationDataComponent } from './registration-data/registration-data.component';

@NgModule({
  declarations: [
    CustomerDetailComponent,
    RegistrationDataComponent,
    ContactsComponent,
    AddressComponent,
    FinancialDataComponent,
    ContactComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CustomerDetailComponent,
    RegistrationDataComponent,
    ContactsComponent,
    AddressComponent,
    FinancialDataComponent,
    ContactComponent
  ]
})
export class CustomerDetailModule { }
