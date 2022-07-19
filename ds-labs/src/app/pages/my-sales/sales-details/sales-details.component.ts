import { Component, Injector } from '@angular/core';
import { BaseResourceDetail } from '@app/shared/components/base-resource-detail.component';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { Sales } from '../shared/interfaces/sales';
import { SalesItems } from '../shared/interfaces/sales-items';
import { SalesModel } from '../shared/model/sales-model';

@Component({
    selector: 'app-sales-details',
    templateUrl: './sales-details.component.html'
})
export class SalesDetailsComponent extends BaseResourceDetail {
    header: Sales = new SalesModel();
    items: SalesItems[] = [];

    constructor(
      protected override injector: Injector
    ) {
      super(injector, 'sales/','Detalhes do Pedido' )
    }

    getBreadCrumb(): PoBreadcrumb {
        return {
            items: [
                { label: 'Meus Pedidos', link: '/sales' },
                { label: 'Detalhes do Pedido de Venda' }
            ]
        };
    }

    onInitResources(): void {
        this.getSalesHeaderByRoute();
        this.getSalesItemsByRoute();
    }

    getSalesHeaderByRoute(): void {
        this.header = this.activatedroute.snapshot.data['header'];
    }

    getSalesItemsByRoute(): void {
        this.items = this.activatedroute.snapshot.data['items'];
        this.items = this.items.filter(
            i => i.salesId.toString() === this.detailId
        );
    }
}
