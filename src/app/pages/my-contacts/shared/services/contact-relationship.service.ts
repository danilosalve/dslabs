import { Injectable, Injector } from '@angular/core';
import { BaseResourceServiceFull } from '@app/shared/services/base-resource-full.service';
import { PoTableColumn } from '@po-ui/ng-components';
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
}
