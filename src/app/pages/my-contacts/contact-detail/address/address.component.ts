import { Component, Input } from '@angular/core';
import { Contact } from '../../shared/interfaces/contact';
import { ZipcodePipe } from './../../../../shared/pipe/zipcode.pipe';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html'
})
export class AddressComponent {
  @Input() contact!: Contact;
  constructor(protected zipCodePipe: ZipcodePipe) { }
}
