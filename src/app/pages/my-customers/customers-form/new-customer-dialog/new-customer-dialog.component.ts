import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { TypeOfPerson } from '@app/shared/enum/type-of-person.enum';
import { PoRadioGroupOption } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  take
} from 'rxjs/operators';
import { CustomerService } from './../../shared/services/customer.service';

@Component({
    selector: 'app-new-customer-dialog',
    templateUrl: './new-customer-dialog.component.html',
    styles: []
})
export class NewCustomerDialogComponent implements OnInit, OnDestroy {
    @Output() changeForm = new EventEmitter();
    newCustomerForm!: UntypedFormGroup;
    isCustomerSelected = false;
    formCustomer$ = new Subscription();
    readonly typeOfPersonsOptions: Array<PoRadioGroupOption> = [
        { label: 'Pessoa Fisica', value: TypeOfPerson.NATURAL },
        { label: 'Pessoa Juridica', value: TypeOfPerson.LEGAL }
    ];

    constructor(
        protected formBuilder: UntypedFormBuilder,
        protected customerService: CustomerService
    ) {}

    ngOnInit(): void {
        this.onInitForm();
        this.listenFormChange();
    }

    ngOnDestroy(): void {
        this.formCustomer$.unsubscribe();
    }

    onInitForm(): void {
        this.newCustomerForm = this.formBuilder.group({
            typeOfPerson: [TypeOfPerson.LEGAL],
            customerLink: [false],
            customerId: [undefined],
            copyCustomer: [false]
        });
    }

    onChangeCustomerLink(isSelected: boolean): void {
        if (!isSelected) {
            this.newCustomerForm.get('customerId')?.setValidators(null);
            this.newCustomerForm.get('customerId')!.setValue(undefined);
            this.newCustomerForm.get('copyCustomer')!.setValue(false);
        } else {
            this.newCustomerForm
                .get('customerId')
                ?.setValidators(Validators.required);
        }
    }

    handleCustomerSelection(id: number): void {
        this.customerService
            .getById(id)
            .pipe(
                filter(() => id !== undefined),
                distinctUntilChanged(),
                take(1)
            )
            .subscribe({
                next: customer => {
                    this.newCustomerForm
                        .get('typeOfPerson')!
                        .setValue(customer.typePerson);
                    this.isCustomerSelected = true;
                },
                error: () => (this.isCustomerSelected = false)
            });
    }

    listenFormChange(): void {
        this.formCustomer$ = this.newCustomerForm.valueChanges
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe(res => {
                this.changeForm.emit({
                    form: res,
                    invalidForm: this.newCustomerForm.invalid
                });
            });
    }
}
