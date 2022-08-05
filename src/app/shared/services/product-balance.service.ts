import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '@app/shared/services/base-resource.service';
import { ProductBalance } from '../interfaces/product-balance';

@Injectable({
  providedIn: 'root'
})
export class ProductBalanceService extends BaseResourceService<ProductBalance> {
  constructor(protected override injector: Injector) {
    super('api/productBalance/', injector);
  }
}
