import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CityService } from '@app/shared/services/city.service';
import { StatesService } from '@app/shared/services/states.service';
import { Contact } from '../../shared/interfaces/contact';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html'
})
export class AddressComponent {
    @Input() contact!: Contact;
    @Input() formContact!: UntypedFormGroup;
    constructor(
        protected statesService: StatesService,
        protected cityService: CityService
    ) {}

    onChangeState(): void {
        this.formContact.get('city')?.setValue(undefined);
    }
}
