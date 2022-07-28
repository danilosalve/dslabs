import { Injectable, Injector } from '@angular/core';
import { Seller } from '../interfaces/seller';
import { BaseResourceService } from './base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class SellerService extends BaseResourceService<Seller>{
  constructor(
    protected override injector: Injector
  ) {
    super('api/sellers/', injector);
  }
}
