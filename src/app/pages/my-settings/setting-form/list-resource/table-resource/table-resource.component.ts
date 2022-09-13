import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { Customer } from '@app/pages/my-customers/shared/interface/customer';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { BaseResourceTable } from '@app/shared/components/base/base-resource-table.component';
import { PoTableAction } from '@po-ui/ng-components';

@Component({
    selector: 'app-table-resource',
    templateUrl: './table-resource.component.html'
})
export class TableResourceComponent extends BaseResourceTable<Customer> {
    @Output() disclaimerEvent = new EventEmitter();
    constructor(
        protected customerService: CustomerService,
        protected override injector: Injector
    ) {
        super(injector, customerService);
    }

    transformDocument(document: string): string {
        return this.customerService.transformDocument(document);
    }

    getActions(): PoTableAction[] {
        throw [];
    }

    handleSelectedResource(row: any): void {
      this.handleDisclaimerEvent(row.id, row.$selected);
    }

    handleDisclaimerEvent(id: number, isSelected: boolean): void {
        this.disclaimerEvent.emit({id, isSelected});
    }

    handleAllSelected(rows: any[]): void {
      rows.forEach(row => {
        this.handleDisclaimerEvent(row.id, row.$selected )
      });
    }
}
