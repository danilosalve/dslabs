import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseResourceList } from '@app/shared/components/base/base-resource-list.component';
import { PoPageAction } from '@po-ui/ng-components';
import { Contact } from '../../shared/interfaces/contact';
import { ContactsService } from './../../shared/services/contacts.service';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html'
})
export class ContactListComponent extends BaseResourceList<Contact> {
    constructor(
        protected contactService: ContactsService,
        protected override injector: Injector,
        protected router: Router
    ) {
        super(injector, contactService);
    }

    getActions(): PoPageAction[] {
        return [
          {
            label: 'Cadastrar Contato',
            icon: 'po-icon-plus',
            action: () => this.router.navigate(['contacts/new'])
          }
        ]
    }

    handleSearch(resource: Contact[], search: string): Contact[] {
        return resource.filter(
            contacts =>
                contacts.id?.toString().includes(search) ||
                contacts.name?.toLowerCase().includes(search.toLowerCase()) ||
                contacts.email?.toLowerCase().includes(search.toLowerCase())
        );
    }

    onShowContact(contact: Contact): void {
      this.onHandleAction(contact, 'view');
    }

    onEditContact(contact: Contact): void {
      this.onHandleAction(contact, 'edit');
    }

    onHandleAction(contact: Contact, action = 'view'): void {
      this.isLoading = true;
      this.router.navigate([`contacts/${action}`, contact.id]);
    }
}
