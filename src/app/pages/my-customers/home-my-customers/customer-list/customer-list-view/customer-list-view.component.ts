import { Component } from '@angular/core';
import { CustomerType } from '@app/pages/my-customers/shared/enum/customer-type.enum';
import { Customer } from '@app/pages/my-customers/shared/interface/customer';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { BaseResourceListView } from '@app/shared/components/base/base-resource-list-view.component';
import { UtilsService } from '@app/shared/services/utils.service';
import { PoListViewAction } from '@po-ui/ng-components';

@Component({
    selector: 'app-customer-list-view',
    templateUrl: './customer-list-view.component.html'
})
export class CustomerListViewComponent extends BaseResourceListView<Customer> {
  type = {}
    constructor(
        protected customerService: CustomerService,
        protected utilsService: UtilsService
    ) {
        super();
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

    getActions(): PoListViewAction[] {
      return [];
    }
}
