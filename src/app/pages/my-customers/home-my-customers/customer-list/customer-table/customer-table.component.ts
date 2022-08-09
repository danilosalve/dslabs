import { BaseResourceTable } from './../../../../../shared/components/base/base-resource-table.component';
import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { Customer } from '@app/pages/my-customers/shared/interface/customer';
import { PoTableAction } from '@po-ui/ng-components';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { CustomerListComponent } from '../customer-list.component';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html'
})
export class CustomerTableComponent extends BaseResourceTable<Customer> {
  @Output() showCustomer = new EventEmitter();

  constructor(
    protected customerService: CustomerService,
    protected override injector: Injector
    ) {
      super(injector, customerService);
    }

  getActions(): PoTableAction[] {
    return [
      {
        action: this.handleShowCustomer.bind(this),
        icon: 'po-icon-eye',
        label: 'Visualizar'
      }
    ];
  }

  handleShowCustomer($event: Customer): void {
    this.showCustomer.emit($event);
  }

  transformDocument(document: string): string {
    return this.customerService.transformDocument(document);
  }
}
