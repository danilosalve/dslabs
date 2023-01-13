import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '@app/shared/services/base-resource.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, retry } from 'rxjs/operators';
import { ProductBalance } from '../interfaces/product-balance';

@Injectable({
    providedIn: 'root'
})
export class ProductBalanceService extends BaseResourceService<ProductBalance> {
    constructor(protected override injector: Injector) {
        super('api/productBalances/', injector);
    }

    getByProductId(productId: string): Observable<ProductBalance[]> {
        return this.http
            .get<ProductBalance[]>(`${this.apiPath}?productId=${productId}`)
            .pipe(
                retry(2),
                catchError((error: HttpErrorResponse) => {
                    throw error;
                })
            );
    }
}
