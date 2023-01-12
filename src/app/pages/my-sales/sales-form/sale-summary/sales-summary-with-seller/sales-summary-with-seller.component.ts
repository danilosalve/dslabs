import { Component, Input, OnInit } from '@angular/core';
import {
  UntypedFormBuilder
} from '@angular/forms';
import { Sales } from '@app/pages/my-sales/shared/interfaces/sales';
import { Seller } from '@app/shared/interfaces/seller';
import { SellerModel } from '@app/shared/model/seller-model';
import { PoNotificationService } from '@po-ui/ng-components';
import { take } from 'rxjs/operators';
import { SellerService } from './../../../../../shared/services/seller.service';

@Component({
    selector: 'app-sales-summary-with-seller',
    templateUrl: './sales-summary-with-seller.component.html'
})
export class SalesSummaryWithSellerComponent implements OnInit {
    @Input() sales: Sales | undefined;
    seller: Seller = new SellerModel();

    constructor(
        protected poNotification: PoNotificationService,
        protected sellerService: SellerService,
        protected fb: UntypedFormBuilder
    ) {}

    ngOnInit() {
        this.onInitSeller();
    }

    onInitSeller(): void {
        this.sellerService
            .getById(1)
            .pipe(take(1))
            .subscribe({
                next: seller => {
                    this.seller = seller;
                },
                error: () =>
                    this.poNotification.error('Falha ao obter Vendedor')
            });
    }
}
