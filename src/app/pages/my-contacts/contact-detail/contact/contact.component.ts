import { Component, Input } from '@angular/core';
import { Contact } from '../../shared/interfaces/contact';
import { PhonePipe } from './../../../../shared/pipe/phone.pipe';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: [
  ]
})
export class ContactComponent {
  @Input() contact!: Contact;
  constructor(
    protected phonePipe: PhonePipe
  ) { }
}
