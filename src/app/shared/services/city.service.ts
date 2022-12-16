import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { PoComboFilter, PoComboOption } from '@po-ui/ng-components';
import 'lodash';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, retry } from 'rxjs/operators';
import { City } from '../interfaces/city';
import { BaseResourceService } from './base-resource.service';
declare var _:any;

@Injectable({
    providedIn: 'root'
})
export class CityService extends BaseResourceService<City> implements PoComboFilter {
    constructor(protected override injector: Injector) {
        super('api/citys/', injector);
    }

    getByName(name: string): Observable<City[]> {
      return this.http
        .get<City[]>(`${this.apiPath}?name=${name}`)
        .pipe(
          retry(2),
          catchError((error: HttpErrorResponse) => {
            throw error;
        })
      );
    }

    getByUf(uf: string): Observable<City[]> {
      return this.http
        .get<City[]>(`${this.apiPath}?state=${uf}`)
        .pipe(
          map(citys => _.sortBy(citys, (el:City) => el.name)),
          retry(2),
          catchError((error: HttpErrorResponse) => {
            throw error;
        })
      );
    }

    getObjectByValue( value: string | number, filterParams?: any ): Observable<PoComboOption> {
      return this.getByName(value.toString()).pipe(
        map(city => city.find( s => s.name === value.toString())),
        map(city => ({
          label: city?.name || '',
          value: city?.name || ''
        }))
      )
    }

    getFilteredData( params: any, filterParams?: any ): Observable<PoComboOption[]> {
        return this.getByUf(filterParams).pipe(
            map(citys => citys = citys.filter(c => c.name.toUpperCase().includes(params.value.toString().toLocaleUpperCase()))),
            map(citys =>
                citys.map(city => ({
                    value: city.name,
                    label: city.name
                }))
            )
        );
    }
}
