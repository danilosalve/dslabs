import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '@app/shared/services/base-resource.service';
import { Field } from '../interfaces/field';

@Injectable({
  providedIn: 'root'
})
export class FieldsService extends BaseResourceService<Field> {
  constructor(protected override injector: Injector) {
    super('api/fields/', injector);
  }
}
