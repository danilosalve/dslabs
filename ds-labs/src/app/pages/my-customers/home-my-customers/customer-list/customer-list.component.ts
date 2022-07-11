import { Component, Injector } from '@angular/core';
import { BaseResourceList } from '@app/shared/components/base-resource-list.component';
import { PoPageAction, PoTableAction } from '@po-ui/ng-components';
import { CustomerService } from '../../shared/services/customer.service';
import { Customer } from './../../shared/interface/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent extends BaseResourceList<Customer> {

  constructor(
    protected customerService: CustomerService,
    protected override injector: Injector
    ) {
      super(injector, customerService, 'Meus Clientes');
    }

    handleSearch(resource: Customer[], search: string): Customer[] {
      return resource.filter(customers => customers.id?.toString().includes(search) ||
      customers.name
        ?.toLowerCase()
        .includes(search.toLowerCase()));
    }

    getActions(): PoPageAction[] {
      return [];
    }
    getTableActions(): PoTableAction[] {
      return [];
    }
}
