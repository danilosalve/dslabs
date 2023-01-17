import { Component, Input } from '@angular/core';
import { ZipcodePipe } from '@app/shared/pipe/zipcode.pipe';
import { Customer } from '../../shared/interface/customer';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html'
})
export class AddressComponent {
  @Input() customer!: Customer;
  constructor(protected zipCodePipe: ZipcodePipe) { }
}
