import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { PoComboOption } from '@po-ui/ng-components';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, retry } from 'rxjs/operators';
import { PriceList } from '../interfaces/price-list/price-list';
import { BaseResourceService } from './base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class PriceListService extends BaseResourceService<PriceList> {
  constructor(protected override injector: Injector) {
    super('api/priceLists/', injector);
  }

  getByDescription(name: string): Observable<PriceList[]> {
    return this.http
        .get<PriceList[]>(`${this.apiPath}?description=${name}`)
        .pipe(
            retry(2),
            catchError((error: HttpErrorResponse) => {
                throw error;
            })
        );
  }

  getFilteredData(params: any, filterParams?: any): Observable<PoComboOption[]> {
    return this.getByDescription(params.value)
    .pipe(
      map(priceLists => priceLists.map(priceList => ({
        value: priceList.id,
          label: priceList.description
      })))
    )
  }

  getObjectByValue(value: string | number, filterParams?: any): Observable<PoComboOption> {
    return this.getById(value)
    .pipe(
      map(priceList => ({
        value: priceList.id,
        label: priceList.description
      }))
    )
  }
}
