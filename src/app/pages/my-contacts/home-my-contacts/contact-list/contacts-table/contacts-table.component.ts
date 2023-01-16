import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { Contact } from '@app/pages/my-contacts/shared/interfaces/contact';
import { BaseResourceTable } from '@app/shared/components/base/base-resource-table.component';
import { PoTableAction } from '@po-ui/ng-components';
import { ContactsService } from '../../../shared/services/contacts.service';

@Component({
    selector: 'app-contacts-table',
    templateUrl: './contacts-table.component.html'
})
export class ContactsTableComponent extends BaseResourceTable<Contact> {
    @Output() showContact = new EventEmitter();
    @Output() editContact = new EventEmitter();
    constructor(
        protected contactsService: ContactsService,
        protected override injector: Injector
    ) {
        super(injector, contactsService);
    }

    getActions(): PoTableAction[] {
        return [
          {
            action: this.handleEditContact.bind(this),
            icon: 'po-icon-edit',
            label: 'Editar'
          },
          {
            action: this.handleShowContact.bind(this),
            icon: 'po-icon-eye',
            label: 'Visualizar'
          }
        ];
    }

    handleShowContact($event: Contact): void {
      this.showContact.emit($event);
    }

    handleEditContact($event: Contact): void {
      this.editContact.emit($event);
    }
}
