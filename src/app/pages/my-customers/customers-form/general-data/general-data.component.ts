import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { PoSelectOption } from '@po-ui/ng-components';
import { CustomerType } from '../../shared/enum/customer-type.enum';
import { Customer } from '../../shared/interface/customer';
import { UtilsService } from './../../../../shared/services/utils.service';

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

  constructor(
    protected utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.onInitPage();
  }

  onInitPage(): void {
    this.typePersonOptions = this.utilsService.getTypePersonOptions();
    this.customerTypeOptions = this.getCustomerTypeOptions();
    this.handleTypePerson();
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
    const typePerson = this.utilsService.handleTypePerson(this.customer.typePerson);
    this.documentLabel = typePerson.label;
    this.documentMask = typePerson.mask;
    this.documentPlaceHolder = typePerson.placeHolder;
    this.minDocument = typePerson.min;
    this.maxDocument = typePerson.max;
  }
}
