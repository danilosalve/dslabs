import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CityService } from '@app/shared/services/city.service';
import { StatesService } from '@app/shared/services/states.service';
import { Customer } from '../../shared/interface/customer';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styles: []
})
export class AddressComponent {
    @Input() customer!: Customer;
    @Input() formCustomer!: UntypedFormGroup;
    constructor(
        protected statesService: StatesService,
        protected cityService: CityService
    ) {}

    onChangeState(): void {
        this.formCustomer.get('city')?.setValue(undefined);
    }

    onChangeStateDelivery(): void {
        this.formCustomer.get('cityDelivery')?.setValue(undefined);
    }

    copyMainAddressToDeliveryAddress(canCopy: boolean): void {
        if (canCopy) {
            this.formCustomer.get('zipCodeDelivery')?.setValue(this.formCustomer.get('zipCode')?.value);
            this.formCustomer.get('stateDelivery')?.setValue(this.formCustomer.get('state')?.value);
            this.formCustomer.get('cityDelivery')?.setValue(this.formCustomer.get('city')?.value);
            this.formCustomer.get('addressDelivery')?.setValue(this.formCustomer.get('address')?.value);
            this.formCustomer.get('neighborhoodDelivery')?.setValue(this.formCustomer.get('neighborhood')?.value);
            this.formCustomer.get('complementDelivery')?.setValue(this.formCustomer.get('complement')?.value);
        }
    }
}
