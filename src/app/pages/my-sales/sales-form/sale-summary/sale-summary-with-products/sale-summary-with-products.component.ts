import { CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component, DoCheck, Input } from '@angular/core';
import { ProductService } from '@app/pages/my-products/shared/services/product.service';
import { SalesItems } from '@app/pages/my-sales/shared/interfaces/sales-items';
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
    templateUrl: './sale-summary-with-products.component.html'
})
export class SaleSummaryWithProductsComponent implements DoCheck {
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
        protected currencyPipe: CurrencyPipe,
        private cd: ChangeDetectorRef
    ) {}

    ngDoCheck(): void {
        if (this.hasProducts()) {
            this.geProductPhotoAndMergeWithSaleItem();
        }
        this.cd.markForCheck();
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
            if (this.canAddProduct(item.productId)) {
                this.productService
                    .getById(item.productId)
                    .pipe(take(1))
                    .subscribe({
                        next: product => {
                            const newProduct: ISaleProduct = item;
                            newProduct.photo = `assets/img/products/${product.photo}`;
                            newProduct.productName = `${item.itemId} - ${product.description}`;
                            if (this.canAddProduct(product.id)){
                              this.products.push(newProduct);
                            }
                        },
                        error: () =>
                            this.poNotificationService.error(
                                `Não foi possivel obter o valor do produto ${item.productId}`
                            )
                    });
            } else {
                this.onProductChange(item);
            }
        });
    }

    canAddProduct(id: string): boolean {
        return !this.products.some(p => p.productId === id);
    }

    onProductChange(saleItem: SalesItems): void {
        const index = this.products.findIndex(
            p => p.productId === saleItem.productId
        );
        if (index >= 0) {
            this.products[index].quantity = saleItem.quantity;
            this.products[index].amount = saleItem.amount;
        }
    }
}
