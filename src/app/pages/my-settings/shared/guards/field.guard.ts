import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Field } from './../interfaces/field';
import { FieldsService } from './../services/fields.service';
@Injectable()
export class FieldGuard implements Resolve<Field[]> {
    constructor(private fieldService: FieldsService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Field[]> {
      return this.fieldService.getByTableId(route.params['id']);
    }
}
