import { NgModule } from '@angular/core';
import { SharedModule } from './../../../shared/shared.module';
import { ContactDetailComponent } from './contact-detail.component';
import { RegistrationDataComponent } from './registration-data/registration-data.component';
import { AddressComponent } from './address/address.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    ContactDetailComponent,
    RegistrationDataComponent,
    AddressComponent,
    ContactComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ContactDetailModule { }
