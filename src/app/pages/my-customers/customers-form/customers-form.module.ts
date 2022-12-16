import { NgModule } from '@angular/core';
import { SharedModule } from './../../../shared/shared.module';
import { AddressComponent } from './address/address.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CustomersFormComponent } from './customers-form.component';
import { FinancialDataComponent } from './financial-data/financial-data.component';
import { GeneralDataComponent } from './general-data/general-data.component';
import { NewCustomerDialogComponent } from './new-customer-dialog/new-customer-dialog.component';

@NgModule({
  declarations: [
    CustomersFormComponent,
    NewCustomerDialogComponent,
    ContactsComponent,
    AddressComponent,
    FinancialDataComponent,
    GeneralDataComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    NewCustomerDialogComponent
  ]
})
export class CustomersFormModule { }
