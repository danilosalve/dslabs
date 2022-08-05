import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '@app/shared/services/base-resource.service';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Field } from '../interfaces/field';

@Injectable({
  providedIn: 'root'
})
export class FieldsService extends BaseResourceService<Field> {
  constructor(protected override injector: Injector) {
    super('api/fields/', injector);
  }

  getByTableId(id: string): Observable<Field[]> {
    return this.http.get<Field[]>(`${this.apiPath}?tableId=${id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        throw (error);
      })
    )
  }
}
