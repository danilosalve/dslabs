import { Component, EventEmitter, Output } from '@angular/core';
import { CustomerType } from '@app/pages/my-customers/shared/enum/customer-type.enum';
import { Customer } from '@app/pages/my-customers/shared/interface/customer';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { BaseResourceListView } from '@app/shared/components/base/base-resource-list-view.component';
import { ResourceStatus } from '@app/shared/enum/resource-status.enum';
import { PoListViewAction } from '@po-ui/ng-components';

@Component({
    selector: 'app-list-view-resource',
    templateUrl: './list-view-resource.component.html'
})
export class ListViewResourceComponent extends BaseResourceListView<Customer>  {
    @Output() disclaimerEvent = new EventEmitter();
    constructor(private customerService: CustomerService) {
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
                return 'Não informado';
        }
    }

    transformStatus(status: string): string {
        switch (status) {
            case ResourceStatus.active:
                return 'Ativo';
            case ResourceStatus.inactive:
                return 'Inativo';
            default:
                return 'Não informado';
        }
    }

    getColorStatus(status: string): string {
        switch (status) {
            case ResourceStatus.active:
                return 'color-11';
            case ResourceStatus.inactive:
                return 'color-07';
            default:
                return 'color-03';
        }
    }

    getActions(): PoListViewAction[] {
        return [];
    }

    handleMarkItems(): void {
      this.items.forEach(item => {
        this.disclaimerEvent.emit({id: item.id, isSelected: item.$selected});
      });
    }
}
