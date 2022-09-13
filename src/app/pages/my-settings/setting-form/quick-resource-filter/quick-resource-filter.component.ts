import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-quick-resource-filter',
  templateUrl: './quick-resource-filter.component.html'
})
export class QuickResourceFilterComponent implements OnInit {
  @Output() changeQuickFilter = new EventEmitter();
  formQuickFilter!: UntypedFormGroup;

  constructor(
      protected formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.formQuickFilter = this.formBuilder.group({
      lastMonth: [false],
      lastThreeMonths: [false],
      newCustomers: [false],
      customersWithoutSale: [false]
    });
  }

  onChangeQuickFilter(isSelected: boolean, field: string): void {
    if (isSelected) {
      this.formQuickFilter.get('lastMonth')?.setValue(field === 'lastMonth');
      this.formQuickFilter.get('lastThreeMonths')?.setValue(field === 'lastThreeMonths');
      this.formQuickFilter.get('newCustomers')?.setValue(field === 'newCustomers');
      this.formQuickFilter.get('customersWithoutSale')?.setValue(field === 'customersWithoutSale');
    }
    this.onEmitQuickFilter(isSelected, field);
  }

  onEmitQuickFilter(isSelected: boolean, field: string): void {
    this.changeQuickFilter.emit({isSelected, field});
  }
}
