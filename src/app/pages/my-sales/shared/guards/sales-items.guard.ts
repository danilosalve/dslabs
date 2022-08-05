import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { SalesItems } from '../interfaces/sales-items';
import { SalesItemsService } from '../services/sales-items.service';

@Injectable()
export class SalesItemsGuard implements Resolve<SalesItems[]> {
  constructor(private salesItemsService: SalesItemsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<SalesItems[]> {
    return this.salesItemsService.getBySalesId(route.params['id']);
  }
}
