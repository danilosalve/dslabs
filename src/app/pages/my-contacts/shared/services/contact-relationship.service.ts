import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceServiceFull } from '@app/shared/services/base-resource-full.service';
import { PoTableColumn } from '@po-ui/ng-components';
import { catchError, retry } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ContactRelationship } from '../interfaces/contact-relationship';

@Injectable({
    providedIn: 'root'
})
export class ContactRelationshipService extends BaseResourceServiceFull<ContactRelationship> {
    constructor(protected override injector: Injector) {
        super('api/contactRelationships/', injector);
    }

    getColumns(): PoTableColumn[] {
        throw new Error('Method not implemented.');
    }
    getHeadersForExcel(): string[] {
        throw new Error('Method not implemented.');
    }

    getByCustomerId(customerId: number): Observable<ContactRelationship[]> {
        return this.http
            .get<ContactRelationship[]>(
                `${this.apiPath}?customerId=${customerId}`
            )
            .pipe(
                retry(2),
                catchError((error: HttpErrorResponse) => {
                    throw error;
                })
            );
    }
}
