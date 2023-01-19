import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { Contact } from '@app/pages/my-contacts/shared/interfaces/contact';
import { ContactsService } from '@app/pages/my-contacts/shared/services/contacts.service';
import { of, Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  mergeMap,
  take
} from 'rxjs/operators';
import { Customer } from '../../shared/interface/customer';
import { ContactRelationshipService } from './../../../my-contacts/shared/services/contact-relationship.service';

@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html'
})
export class AddContactComponent implements OnInit, OnChanges, OnDestroy {
    @Input() customer!: Customer;
    @Output() changeForm = new EventEmitter();
    isLoading = false;
    formContact!: UntypedFormGroup;
    contacts: Contact[] = [];
    formContact$ = new Subscription();

    constructor(
        protected contactService: ContactsService,
        protected contactRelationshipService: ContactRelationshipService,
        protected formBuilder: UntypedFormBuilder
    ) {}

    ngOnDestroy(): void {
        this.formContact$.unsubscribe();
    }

    ngOnChanges(): void {
        if (this.customer) {
            this.contacts = [];
            this.isLoading = true;
            this.formContact.reset();
            this.fetchContactRelationship();
        }
    }

    ngOnInit(): void {
        this.onInitForm();
        this.listenFormChange();
    }

    onInitForm(): void {
        this.formContact = this.formBuilder.group({
            contactId: [undefined, [Validators.required]]
        });
    }

    fetchContactRelationship(): void {
        this.contactRelationshipService
            .getByCustomerId(this.customer.id)
            .pipe(
                mergeMap(contactsRelationships => {
                    let contacts: Contact[] = [];
                    contactsRelationships.forEach(contactsRelationship =>
                        this.getContact(
                            contactsRelationship.contactId
                        ).subscribe(contact => contacts.push(contact))
                    );
                    return of(contacts);
                }),
                finalize(() => (this.isLoading = false))
            )
            .subscribe({
                next: contacts => (this.contacts = contacts)
            });
    }

    getContact(contactId: number): Observable<Contact> {
        return this.contactService.getById(contactId).pipe(take(1));
    }

    listenFormChange(): void {
        this.formContact$ = this.formContact.valueChanges
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe(form => {
                this.changeForm.emit({
                    form: form,
                    invalidForm: this.formContact.invalid
                });
            });
    }
}
