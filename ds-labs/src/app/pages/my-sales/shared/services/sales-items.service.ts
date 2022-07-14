import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceServiceFull } from '@app/shared/services/base-resource-full.service';
import { PoTableColumn } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SalesItems } from '../interfaces/sales-items';

@Injectable({
  providedIn: 'root'
})
export class SalesItemsService extends BaseResourceServiceFull<SalesItems> {
  constructor(protected override injector: Injector) {
    super('api/salesItems/', injector);
  }

  getBySalesId(id: string): Observable<SalesItems[]> {
    return this.http.get<SalesItems[]>(`${this.apiPath}?salesId=${id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        throw (error);
      })
    )
  }

  getColumns(): PoTableColumn[] {
    return [
      { property: 'itemId', label: 'Item', type: 'number', width: '8%' },
      { property: 'productId', label: 'Cód. Produto', type: 'number', visible: false },
      { property: 'productName', label: 'Desc. Produto', type: 'string' },
      { property: 'value', label: 'Vlr. Unitário', type: 'currency', format: 'BRL' },
      { property: 'quantity', label: 'Quantidade', type: 'number' },
      { property: 'amount', label: 'Vlr. Total', type: 'currency', format: 'BRL' },
      { property: 'discount', label: 'Desconto', type: 'number' }
    ];
  }
}
