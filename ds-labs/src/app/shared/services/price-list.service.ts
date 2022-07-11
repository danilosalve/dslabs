import { Injectable, Injector } from '@angular/core';
import { PoSelectOption } from '@po-ui/ng-components';
import { PriceList } from '../interfaces/price-list/price-list';
import { BaseResourceService } from './base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class PriceListService extends BaseResourceService<PriceList> {
  constructor(protected override injector: Injector) {
    super('api/priceList/', injector);
  }

  getComboOptions(priceLists: PriceList[]): PoSelectOption[] {
    return priceLists.map(priceList => ({
      value: priceList.id,
      label: priceList.description
    }));
  }
}
