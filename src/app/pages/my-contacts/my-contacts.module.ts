import { NgModule } from '@angular/core';
import { DocumentPipe } from '@app/shared/pipe/document.pipe';
import { ContactDetailModule } from './contact-detail/contact-detail.module';
import { ContactFormModule } from './contact-form/contact-form.module';
import { HomeMyContactsModule } from './home-my-contacts/home-my-contacts.module';
import { MyContactsRoutingModule } from './my-contacts-routing.module';
import { ContactGuard } from './shared/guards/contact.guard';

@NgModule({
  imports: [
    MyContactsRoutingModule,
    HomeMyContactsModule,
    ContactFormModule,
    ContactDetailModule
  ],
  providers: [ContactGuard, DocumentPipe]
})
export class MyContactsModule { }
