import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared/shared.module';
import { CustomerDetailComponent } from './customer-detail.component';
import { RegistrationDataComponent } from './registration-data/registration-data.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AddressComponent } from './address/address.component';
import { FinancialDataComponent } from './financial-data/financial-data.component';
import { ContactComponent } from './contacts/contact/contact.component';

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
  ]
})
export class CustomerDetailModule { }
