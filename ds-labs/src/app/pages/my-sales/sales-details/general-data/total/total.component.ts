import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SalesItems } from '@app/pages/my-sales/shared/interfaces/sales-items';
import { SalesOrderTotal } from '@app/pages/my-sales/shared/interfaces/sales-order-total';
import { SalesModel } from '@app/pages/my-sales/shared/model/sales-model';
import { SalesTotalModel } from '@app/pages/my-sales/shared/model/sales-total.model';
import { SalesService } from '@app/pages/my-sales/shared/services/sales.service';
import { DeviceService } from './../../../../../shared/services/device.service';
import { Sales } from './../../../shared/interfaces/sales';

@Component({
    selector: 'app-total',
    templateUrl: './total.component.html',
    styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit {
    @Input() header: Sales = new SalesModel();
    @Input() items: SalesItems[] = [];
    height = 0;
    taxes = 0;
    saleTotal: SalesOrderTotal = new SalesTotalModel();

    constructor(
        protected currencyPipe: CurrencyPipe,
        protected deviceService: DeviceService,
        protected salesService: SalesService
    ) {}

    ngOnInit(): void {
        this.onInitPage();
        this.calculateTotal();
    }

    onInitPage(): void {
        this.height = this.getHeight();
    }

    calculateTotal(): void {
      this.saleTotal = this.salesService.calculateSalesOrderTotal(this.header, this.items);
    }

    getHeight(): number {
        if (this.deviceService.isSmartphone()) {
            return 585;
        } else {
            return 660;
        }
    }

    transformValue(value: number): string {
      return this.currencyPipe.transform(value, 'BRL') + '';
    }
}
