import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '@app/shared/services/base-resource.service';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseResourceService<Product> {
  constructor(
    protected override injector: Injector
  ) {
    super('api/products/', injector);
  }
}
