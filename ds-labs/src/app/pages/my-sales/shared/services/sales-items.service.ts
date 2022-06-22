import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { SalesItems } from '../interfaces/sales-items';

@Injectable({
  providedIn: 'root',
})
export class SalesItemsService extends BaseResourceService<SalesItems> {
  constructor(protected override injector: Injector) {
    super('api/salesItems/', injector);
  }
}
