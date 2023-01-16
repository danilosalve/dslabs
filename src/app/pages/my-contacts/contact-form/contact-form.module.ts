import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ContactFormComponent } from './contact-form.component';
import { GeneralDataComponent } from './general-data/general-data.component';
import { ContactComponent } from './contact/contact.component';
import { AddressComponent } from './address/address.component';

@NgModule({
  declarations: [
    ContactFormComponent,
    GeneralDataComponent,
    ContactComponent,
    AddressComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ContactFormModule { }
