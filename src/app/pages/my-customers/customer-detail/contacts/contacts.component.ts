import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '@app/pages/my-contacts/shared/interfaces/contact';
import { ContactRelationshipService } from '@app/pages/my-contacts/shared/services/contact-relationship.service';
import { ContactsService } from '@app/pages/my-contacts/shared/services/contacts.service';
import { of, take, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { finalize, mergeMap } from 'rxjs/operators';
import { Customer } from './../../shared/interface/customer';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {
    @Input() customer!: Customer;
    contacts: Contact[] = [];
    contactsMessage = '';
    isLoading = false;

    constructor(
        protected contactRelationshipService: ContactRelationshipService,
        protected contactService: ContactsService
    ) {}

    ngOnInit(): void {
        this.fetchContactRelationship();
    }

    fetchContactRelationship(): void {
        this.contactRelationshipService
            .getByCustomerId(this.customer.id)
            .pipe(
                tap(() => (this.isLoading = true)),
                mergeMap(contactsRelationships => {
                  let contacts: Contact[] = [];
                  contactsRelationships.map(contactsRelationship =>
                        this.getContact(contactsRelationship.contactId).subscribe(contact =>
                            contacts.push(contact)
                        )
                    );
                    return of(contacts);
                }),
                finalize(() => (this.isLoading = false))
            )
            .subscribe({
                next: contacts => this.contacts = contacts
            });
    }

    getContact(contactId: number): Observable<Contact> {
        return this.contactService.getById(contactId).pipe(take(1));
    }
}
