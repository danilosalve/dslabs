import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { Observable } from 'rxjs';
import { Customer } from '../interface/customer';

@Injectable()
export class CustomerGuard implements Resolve<Customer> {
    constructor(private customerService: CustomerService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Customer> {
      return this.customerService.getById(route.params['id']);
    }
}
