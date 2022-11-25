import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input, OnInit
} from '@angular/core';
import { SalesItems } from '@app/pages/my-sales/shared/interfaces/sales-items';
import { SalesOrderTotal } from '@app/pages/my-sales/shared/interfaces/sales-order-total';
import { SalesModel } from '@app/pages/my-sales/shared/model/sales-model';
import { SalesTotalModel } from '@app/pages/my-sales/shared/model/sales-total.model';
import { SalesService } from '@app/pages/my-sales/shared/services/sales.service';
import { DeviceService } from '@app/shared/services/device.service';
import { Sales } from '../shared/interfaces/sales';

@Component({
    selector: 'app-total',
    templateUrl: './total.component.html'
})
export class TotalComponent implements OnInit, DoCheck {
    @Input() header: Sales = new SalesModel();
    @Input() items: SalesItems[] = [];
    height = 0;
    taxes = 0;
    saleTotal: SalesOrderTotal = new SalesTotalModel();

    constructor(
        protected currencyPipe: CurrencyPipe,
        protected deviceService: DeviceService,
        protected salesService: SalesService,
        protected cd: ChangeDetectorRef
    ) {}

    ngDoCheck(): void {
        this.calculateTotal();
        this.cd.markForCheck();
    }

    ngOnInit(): void {
        this.onInitPage();
    }

    onInitPage(): void {
        this.height = this.getHeight();
    }

    calculateTotal(): void {
        this.saleTotal = this.salesService.calculateSalesOrderTotal(
            this.header,
            this.items
        );
    }

    getHeight(): number {
        if (this.deviceService.isSmartphone()) {
            return 585;
        } else {
            return 0;
        }
    }

    transformValue(value: number): string {
        return this.currencyPipe.transform(value, 'BRL') + '';
    }
}
