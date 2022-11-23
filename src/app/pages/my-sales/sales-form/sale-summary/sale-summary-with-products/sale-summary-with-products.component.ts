import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { SalesItems } from '@app/pages/my-sales/shared/interfaces/sales-items';
import { ProductService } from '@app/shared/services/product.service';
import {
  PoInfoOrientation,
  PoNotificationService,
  PoTagOrientation,
  PoTagType
} from '@po-ui/ng-components';
import { take } from 'rxjs/operators';

interface ISaleProduct extends SalesItems {
    photo?: string;
}

@Component({
    selector: 'app-sale-summary-with-products',
    templateUrl: './sale-summary-with-products.component.html',
    styleUrls: ['./sale-summary-with-products.component.css']
})
export class SaleSummaryWithProductsComponent implements OnChanges {
    @Input() salesItems: SalesItems[] = [];
    products: ISaleProduct[] = [];
    orientation = PoTagOrientation.Horizontal;
    orientationInfo = PoInfoOrientation.Horizontal;
    amountTag = PoTagType.Success;
    quantityTag = PoTagType.Danger;
    discountTag = PoTagType.Warning;

    constructor(
        protected productService: ProductService,
        protected poNotificationService: PoNotificationService,
        protected currencyPipe: CurrencyPipe
    ) {}

    ngOnChanges(): void {
        if (this.hasProducts()) {
            this.geProductPhotoAndMergeWithSaleItem();
        }
    }

    hasProducts(): boolean {
        return this.salesItems.length > 0;
    }

    transformCurrency(value: number): string {
        return this.currencyPipe.transform(value, 'BRL') || 'R$ 0,00';
    }

    transformPercent(value: number): string {
        return value.toFixed(2) + ' %' || '0,00 %';
    }

    geProductPhotoAndMergeWithSaleItem(): void {
        this.salesItems.forEach(item => {
            if (this.canAddProduct(item.itemId)) {
                this.productService
                    .getById(item.productId)
                    .pipe(take(1))
                    .subscribe({
                        next: product => {
                            const newProduct: ISaleProduct = item;
                            newProduct.photo = `assets/img/products/${product.photo}`;
                            newProduct.productName = product.description;
                            this.products.push(newProduct);
                        },
                        error: () =>
                            this.poNotificationService.error(
                                `Não foi possivel obter o valor do produto ${item.productId}`
                            )
                    });
            }
        });
    }

    canAddProduct(id: number): boolean {
        return !this.products.some(p => p.itemId === id);
    }
}
