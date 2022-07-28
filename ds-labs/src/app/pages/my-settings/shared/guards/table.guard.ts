import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Table } from '../interfaces/table';
import { TablesService } from './../services/tables.service';

@Injectable()
export class TableGuard implements Resolve<Table> {
    constructor(private tableService: TablesService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Table> {
      return this.tableService.getById(route.params['id']);
    }
}
