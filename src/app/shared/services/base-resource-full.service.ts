import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { PoTableColumn } from '@po-ui/ng-components';
import { Observable, Subject } from 'rxjs';
import { BaseResourceService } from './base-resource.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseResourceServiceFull<T> extends BaseResourceService<T> {
  loading$ = new Subject<boolean>();
  private router: Router;
  constructor(
    @Inject(String) protected path: string,
    protected override injector: Injector
  ) {
    super(path, injector);
    this.router = injector.get(Router);
  }

  abstract getColumns(): PoTableColumn[];
  abstract getHeadersForExcel(): string[];

  navigateTo(route: string, code: string): void {
    this.updateLoading(true);
    this.router.navigate([route, code]);
  }

  private updateLoading(isLoading: boolean): void {
    this.loading$.next(isLoading);
  }

  get loading(): Observable<boolean> {
    return this.loading$.asObservable();
  }
}
