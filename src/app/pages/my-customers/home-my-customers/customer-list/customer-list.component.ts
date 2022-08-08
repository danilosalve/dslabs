import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseResourceList } from '@app/shared/components/base/base-resource-list.component';
import { PoPageAction, PoTableAction } from '@po-ui/ng-components';
import { CustomerService } from '../../shared/services/customer.service';
import { DocumentPipe } from './../../../../shared/pipe/document.pipe';
import { Customer } from './../../shared/interface/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent extends BaseResourceList<Customer> {
  constructor(
    protected customerService: CustomerService,
    protected override injector: Injector,
    protected router: Router,
    protected documentPipe: DocumentPipe
    ) {
      super(injector, customerService);
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
      return [
        {
          action: this.onShowCustomer.bind(this),
          icon: 'po-icon-eye',
          label: 'Visualizar'
        }
      ];
    }

    onShowCustomer(customer: Customer): void {
      this.isLoading = true;
      this.router.navigate(['customers/view', customer.id]);
    }

    transformDocument(document: string): string {
      return this.documentPipe.transform(document);
    }
}
