import { Component, Input } from '@angular/core';
import { Contact } from '@app/pages/my-contacts/shared/interfaces/contact';
import { PhonePipe } from './../../../../../shared/pipe/phone.pipe';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent  {
  @Input() contact!: Contact;

  constructor(protected phonePipe: PhonePipe) { }
}
