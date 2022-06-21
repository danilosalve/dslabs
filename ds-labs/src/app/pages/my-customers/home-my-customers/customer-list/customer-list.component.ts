import { Component, Injector } from '@angular/core';
import { PoPageAction, PoTableAction } from '@po-ui/ng-components';
import { BaseResourceList } from 'src/app/shared/components/base-resource-list.component';
import { CustomerService } from '../../shared/services/customer.service';
import { Customer } from './../../shared/interface/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent extends BaseResourceList<Customer> {

  constructor(
    protected customerService: CustomerService,
    protected override injector: Injector,
    ) {
      super(injector, customerService, 'Meus Clientes');
    }

    getActions(): PoPageAction[] {
      return [];
    }
    getTableActions(): PoTableAction[] {
      return [];
    }
}
