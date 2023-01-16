import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactsListViewComponent } from './contact-list/contacts-list-view/contacts-list-view.component';
import { ContactsTableComponent } from './contact-list/contacts-table/contacts-table.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [
    ContactListComponent,
    ContactsListViewComponent,
    ContactsTableComponent
  ]
})
export class HomeMyContactsModule { }
