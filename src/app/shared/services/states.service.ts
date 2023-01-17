import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { PoComboFilter, PoComboOption } from '@po-ui/ng-components';
import 'lodash';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, retry } from 'rxjs/operators';
import { State } from './../interfaces/state';
import { BaseResourceService } from './base-resource.service';
declare var _: any;

@Injectable({
    providedIn: 'root'
})
export class StatesService extends BaseResourceService<State> implements PoComboFilter {
    constructor(protected override injector: Injector) {
        super('api/states/', injector);
    }

    getByUF(uf: string): Observable<State[]> {
        return this.http.get<State[]>(`${this.apiPath}?uf=${uf}`).pipe(
            retry(2),
            catchError((error: HttpErrorResponse) => {
                throw error;
            })
        );
    }

    getByName(name: string): Observable<State[]> {
        return this.http.get<State[]>(`${this.apiPath}?name=${name}`).pipe(
            map(states => _.sortBy(states, (el: State) => el.name)),
            retry(2),
            catchError((error: HttpErrorResponse) => {
                throw error;
            })
        );
    }

    getObjectByValue(
        value: string | number,
        filterParams?: any
    ): Observable<PoComboOption> {
        return this.getByUF(value.toString()).pipe(
            map(state => state.find(s => s.uf === value.toString())),
            map(state => ({
                label: state?.name || '',
                value: state?.uf || ''
            }))
        );
    }

    getFilteredData(
        params: any,
        filterParams?: any
    ): Observable<PoComboOption[]> {
        return this.getAll().pipe(
            map(states =>
                states.filter(
                    s =>
                        s.name.toLocaleLowerCase().includes(params.value) ||
                        s.uf
                            .toLocaleLowerCase()
                            .includes(params.value.toLowerCase())
                )
            ),
            map(states =>
                states.map(state => ({
                    value: state.uf,
                    label: state.name
                }))
            )
        );
    }
}
