import { AfterContentInit, Component, Input, ViewChild } from '@angular/core';
import { PoAccordionItemComponent } from '@po-ui/ng-components';
import { Sales } from '../../shared/interfaces/sales';
import { SalesItems } from '../../shared/interfaces/sales-items';

@Component({
    selector: 'app-sale-summary',
    templateUrl: './sale-summary.component.html'
})
export class SaleSummaryComponent implements AfterContentInit {
    @Input() sales: Sales | undefined;
    @Input() salesItems: SalesItems[] = [];
    @Input() isMobile = false;
    @ViewChild(PoAccordionItemComponent, { static: true })
    details!: PoAccordionItemComponent;

    ngAfterContentInit(): void {
        this.details.expand();
    }
}
