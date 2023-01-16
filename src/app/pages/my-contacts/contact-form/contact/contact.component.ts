import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Contact } from '../../shared/interfaces/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: [
  ]
})
export class ContactComponent {
  @Input() formContact!: UntypedFormGroup;
  @Input() contact!: Contact;
  phoneMask = '(99) 9999-99999';
  constructor() { }

  onChangePhone(phone: string): void {
    if (phone.length === 10) {
      this.phoneMask = '(99) 9999-99999';
    } else if (phone.length === 11){
      this.phoneMask = '(99) 99999-9999';
    }
  }
}
