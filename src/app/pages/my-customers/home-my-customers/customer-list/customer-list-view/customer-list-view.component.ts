import { Component } from '@angular/core';
import { Customer } from '@app/pages/my-customers/shared/interface/customer';
import { CustomerStatus } from '@app/pages/my-customers/shared/interface/customer-status.enum';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { BaseResourceListView } from '@app/shared/components/base/base-resource-list-view.component';
import { PoListViewAction } from '@po-ui/ng-components';
import { CustomerType } from './../../../shared/interface/customer-type';

@Component({
    selector: 'app-customer-list-view',
    templateUrl: './customer-list-view.component.html'
})
export class CustomerListViewComponent extends BaseResourceListView<Customer> {
  type = {}
    constructor(
        private customerService: CustomerService
    ) {
        super();
    }

    transformDocument(document: string): string {
        return this.customerService.transformDocument(document);
    }

    transformDate(registerDate: Date): string {
      const date =
      typeof registerDate.toLocaleDateString === 'function'
          ? registerDate
          : new Date(registerDate);
      return date ? date.toLocaleDateString() : '';
    }

    transformType(type: string): string {
      switch (type) {
        case CustomerType.FINAL_COSTUMER:
          return 'Consumidor Final';
        case CustomerType.DEALER:
          return 'Revendedor';
        case CustomerType.RURAL_PRODUCER:
          return 'Produtor Rural';
        case CustomerType.EXPORT:
          return 'Exportação';
        default:
          return 'Não informado'
      }
    }

    transformStatus(status: string): string {
      switch (status){
        case CustomerStatus.active:
          return 'Ativo'
        case CustomerStatus.inactive:
          return 'Inativo'
        default:
          return 'Não informado'
      }
    }

    getColorStatus(status: string): string {
      switch (status){
        case CustomerStatus.active:
          return 'color-11'
        case CustomerStatus.inactive:
          return 'color-07'
        default:
          return 'color-03'
      }
    }

    getActions(): PoListViewAction[] {
      return [];
    }
}
