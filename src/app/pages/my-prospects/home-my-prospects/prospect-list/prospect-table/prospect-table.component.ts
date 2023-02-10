import { Component, Injector } from '@angular/core';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { Prospect } from '@app/pages/my-prospects/shared/interfaces/prospect';
import { BaseResourceTable } from '@app/shared/components/base/base-resource-table.component';
import { PoTableAction } from '@po-ui/ng-components';
import { ProspectService } from './../../../shared/services/prospect.service';

@Component({
  selector: 'app-prospect-table',
  templateUrl: './prospect-table.component.html'
})
export class ProspectTableComponent extends BaseResourceTable<Prospect> {
  constructor(
    protected prospectService: ProspectService,
    protected override injector: Injector,
    protected customerService: CustomerService
  ) {
    super(injector, prospectService)
  }

  getActions(): PoTableAction[] {
    return [];
  }
}
