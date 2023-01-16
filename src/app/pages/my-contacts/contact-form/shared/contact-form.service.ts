import { Injectable } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { documentValidator } from '../../../my-customers/customers-form/shared/validators/document.validator';
import { Contact } from '../../shared/interfaces/contact';

@Injectable({
    providedIn: 'root'
})
export class ContactFormService {
    constructor(protected formBuilder: UntypedFormBuilder) {}

    getForm(contact: Contact): UntypedFormGroup {
        return this.formBuilder.group({
            id: [contact.id, [Validators.required]],
            name: [contact.name, [Validators.required]],
            typePerson: [contact.typePerson, [Validators.required]],
            status: [contact.status, [Validators.required]],
            document: [
                contact.document,
                Validators.compose([
                    Validators.minLength(9),
                    Validators.maxLength(14),
                    documentValidator
                ])
            ],
            registerDate: [contact.registerDate],
            email: [contact.email, [Validators.email]],
            phone: [contact.phone, [Validators.maxLength(11)]],
            state: [contact.state],
            city: [contact.city],
            address: [contact.address],
            neighborhood: [contact.neighborhood],
            complement: [contact.complement],
            zipCode: [
                contact.zipCode,
                Validators.compose([
                    Validators.minLength(8),
                    Validators.maxLength(8)
                ])
            ],
            department: [contact.department]
        });
    }
}
