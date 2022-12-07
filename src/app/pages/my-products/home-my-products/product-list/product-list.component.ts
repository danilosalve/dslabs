import { Component, Injector } from '@angular/core';
import { Product } from '@app/pages/my-products/shared/interface/product';
import { ProductService } from '@app/pages/my-products/shared/services/product.service';
import { BaseResourceList } from '@app/shared/components/base/base-resource-list.component';
import { PoPageAction } from '@po-ui/ng-components';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { finalize, map, mergeMap, take, tap } from 'rxjs/operators';
import { ProductBalanceService } from './../../../../shared/services/product-balance.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent extends BaseResourceList<Product> {
    constructor(
        protected override injector: Injector,
        protected productService: ProductService,
        protected balanceService: ProductBalanceService
    ) {
        super(injector, productService);
    }

    getActions(): PoPageAction[] {
        return [];
    }
    handleSearch(resource: Product[], search: string): Product[] {
        return resource.filter(
            products =>
                products.id?.toString().includes(search) ||
                products.description
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                products.group?.toLowerCase().includes(search.toLowerCase())
        );
    }

    override getItems(search?: string | undefined): void {
        this.items$ = this.productService
            .getAll()
            .pipe(
                tap(() => {
                    this.items = [];
                    this.isLoading = true;
                }),
                mergeMap(products => {
                    products.map(product =>
                        this.getProductBalance(product).subscribe(
                            res => {
                              if (product.stockBalance) {
                                product.stockBalance += res.stockBalance || 0;
                              } else {
                                product.stockBalance = res.stockBalance || 0;
                              }
                            }
                        )
                    );
                    return of(products)
                }),
                finalize(() => (this.isLoading = false))
            )
            .subscribe({
                next: resource => {
                    if (search) {
                        this.items = this.handleSearch(resource, search);
                    } else {
                        this.items = resource;
                    }
                },
                error: () =>
                    this.poNotification.error('Falha ao carregar Lista')
            });
    }

    getProductBalance(product: Product): Observable<Product> {
        return this.balanceService.getByProductId(product.id).pipe(
            map(res => res.reduce((acc, currency) => acc + currency.availablequantity, 0)),
            map(res => ({
                ...product,
                stockBalance: res
            })),
            take(1)
        );
    }
}
