import { Inject, Injectable, Injector } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { BaseResourceService } from './base-resource.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseResourceServiceFull<T> extends BaseResourceService<T> {
  constructor(
    @Inject(String) protected path: string,
    protected override injector: Injector
  ) {
    super(path, injector);
  }

  abstract getColumns(): PoTableColumn[];
  abstract getHeadersForExcel(): string[];
}
