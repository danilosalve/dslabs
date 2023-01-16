import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '@app/pages/my-contacts/shared/interfaces/contact';
import { BaseResourceListView } from '@app/shared/components/base/base-resource-list-view.component';
import { UtilsService } from '@app/shared/services/utils.service';
import { PoListViewAction } from '@po-ui/ng-components';
import { ContactsService } from './../../../shared/services/contacts.service';

@Component({
  selector: 'app-contacts-list-view',
  templateUrl: './contacts-list-view.component.html'
})
export class ContactsListViewComponent extends BaseResourceListView<Contact> {
  @Output() editContact = new EventEmitter();
  constructor(protected utilsService: UtilsService, protected contactsService: ContactsService) {
    super()
  }

  getActions(): PoListViewAction[] {
    return [
      {
        action: this.handleEditContact.bind(this),
        icon: 'po-icon-edit',
        label: 'Editar'
      }
    ];
  }

  handleEditContact(contact: Contact): void {
    this.editContact.emit(contact);
  }
}
