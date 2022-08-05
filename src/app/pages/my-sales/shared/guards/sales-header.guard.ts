import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { SalesService } from '@app/pages/my-sales/shared/services/sales.service';
import { Observable } from 'rxjs';
import { Sales } from '../interfaces/sales';

@Injectable()
export class SalesHeaderGuard implements Resolve<Sales> {
    constructor(private salesService: SalesService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Sales> {
      return this.salesService.getById(route.params['id']);
    }
}
