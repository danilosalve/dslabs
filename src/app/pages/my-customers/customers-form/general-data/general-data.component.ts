import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TypeOfPerson } from '@app/shared/enum/type-of-person.enum';
import { PoSelectOption } from '@po-ui/ng-components';
import { CustomerType } from '../../shared/enum/customer-type.enum';
import { Customer } from '../../shared/interface/customer';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styles: [
  ]
})
export class GeneralDataComponent implements OnInit {
  @Input() customer!: Customer;
  @Input() formCustomer!: UntypedFormGroup;
  typePersonOptions: PoSelectOption[] = [];
  customerTypeOptions : PoSelectOption[] = [];
  documentLabel = '';
  documentMask = '';
  documentPlaceHolder = '';
  minDocument = 0;
  maxDocument = 18;

  constructor() { }

  ngOnInit(): void {
    this.onInitPage();
  }

  onInitPage(): void {
    this.typePersonOptions = this.getTypePersonOptions();
    this.customerTypeOptions = this.getCustomerTypeOptions();
    this.handleTypePerson();
  }

  getTypePersonOptions(): PoSelectOption[] {
    return [
      {
        label: 'Pessoa Fisica',
        value: TypeOfPerson.NATURAL
      },
      {
        label: 'Pessoa Juridica',
        value: TypeOfPerson.LEGAL
      }
    ]
  }

  getCustomerTypeOptions(): PoSelectOption[] {
    return [
      {
        label: 'Consumidor Final',
        value: CustomerType.FINAL_COSTUMER
      },
      {
        label: 'Revendedor',
        value: CustomerType.DEALER
      },
      {
        label: 'Exportação',
        value: CustomerType.EXPORT
      },
      {
        label: 'Produtor Rural',
        value: CustomerType.RURAL_PRODUCER
      }
    ]
  }

  handleTypePerson(): void {
    if (this.customer.typePerson === TypeOfPerson.NATURAL) {
      this.documentLabel = 'CPF';
      this.documentMask = '999.999.999-99';
      this.documentPlaceHolder = '000.000.000-00';
      this.minDocument = 14;
      this.maxDocument = 14;
    } else {
      this.documentLabel = 'CNPJ';
      this.documentMask = '99.999.999/9999-99';
      this.documentPlaceHolder = '00.000.000/0000-00';
      this.minDocument = 18;
      this.maxDocument = 18;
    }
  }
}
