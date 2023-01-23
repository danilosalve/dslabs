import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Customer } from '../../shared/interface/customer';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styles: [
  ]
})
export class ContactsComponent {
  @Input() customer!: Customer;
  @Input() formCustomer!: UntypedFormGroup;
}
