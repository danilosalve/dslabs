import { Injectable, Injector } from '@angular/core';
import { PoSelectOption } from '@po-ui/ng-components';
import { Carrier } from './../interfaces/carrier';
import { BaseResourceService } from './base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class CarrierService extends BaseResourceService<Carrier> {
  constructor(protected override injector: Injector) {
    super('api/carriers/', injector);
  }

  getComboOptions(carriers: Carrier[]): PoSelectOption[] {
    return carriers.map((carrier) => ({
      value: carrier.id,
      label: carrier.name,
    }));
  }
}
