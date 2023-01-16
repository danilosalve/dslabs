import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TypeOfPerson } from '@app/shared/enum/type-of-person.enum';
import { UtilsService } from '@app/shared/services/utils.service';
import { PoDatepickerIsoFormat, PoRadioGroupOption } from '@po-ui/ng-components';
import { Contact } from '../../shared/interfaces/contact';

@Component({
    selector: 'app-general-data',
    templateUrl: './general-data.component.html'
})
export class GeneralDataComponent implements OnInit {
    @Input() formContact!: UntypedFormGroup;
    @Input() contact!: Contact;
    documentLabel = '';
    documentMask = '';
    documentPlaceHolder = '';
    minDocument = 0;
    maxDocument = 18;
    readonly isoFormat = PoDatepickerIsoFormat.Extended;
    readonly maxDate = new Date();
    readonly typeOfPersonsOptions: Array<PoRadioGroupOption> = [
        { label: 'Pessoa Fisica', value: TypeOfPerson.NATURAL },
        { label: 'Pessoa Juridica', value: TypeOfPerson.LEGAL }
    ];

    constructor(
      protected utilsService: UtilsService
    ) {}

    ngOnInit(): void {
        this.onInitPage();
    }

    onInitPage(): void {
      this.handleTypePerson(this.contact.typePerson)
    }

    handleTypePerson(type: TypeOfPerson): void {
      const typePerson = this.utilsService.handleTypePerson(type);
      this.documentLabel = typePerson.label;
      this.documentMask = typePerson.mask;
      this.documentPlaceHolder = typePerson.placeHolder;
      this.minDocument = typePerson.min;
      this.maxDocument = typePerson.max;
    }

    onChangeTypePerson(type: TypeOfPerson): void {
      this.formContact.get('document')?.setValue('');
      this.handleTypePerson(type);
    }
}
