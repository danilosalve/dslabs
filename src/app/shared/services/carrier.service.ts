import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import {
  PoComboFilter,
  PoComboOption
} from '@po-ui/ng-components';
import { catchError, map, Observable, retry } from 'rxjs';
import { Carrier } from './../interfaces/carrier';
import { BaseResourceService } from './base-resource.service';

@Injectable({
    providedIn: 'root'
})
export class CarrierService extends BaseResourceService<Carrier> implements PoComboFilter {
    constructor(protected override injector: Injector) {
        super('api/carriers/', injector);
    }

    getByName(name: string): Observable<Carrier[]> {
        return this.http.get<Carrier[]>(`${this.apiPath}?name=${name}`).pipe(
            retry(2),
            catchError((error: HttpErrorResponse) => {
                throw error;
            })
        );
    }

    getFilteredData( params: any, filterParams?: any ): Observable<PoComboOption[]> {
        return this.getByName(params.value).pipe(
            map(carriers =>
                carriers.map(carrier => ({
                    label: carrier.name,
                    value: carrier.id
                }))
            )
        );
    }

    getObjectByValue( value: string | number, filterParams?: any ): Observable<PoComboOption> {
        return this.getById(value).pipe(
            map(carrier => ({
                label: carrier.name,
                value: carrier.id
            }))
        );
    }
}
