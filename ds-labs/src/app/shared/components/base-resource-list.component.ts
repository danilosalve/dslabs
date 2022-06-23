import { Directive, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { BaseResourceServiceFull } from '../services/base-resource-full.service';

@Directive()
export abstract class BaseResourceList<T> implements OnInit, OnDestroy {
  actions: PoPageAction[] = [];
  columns: Array<PoTableColumn> = [];
  isLoading = true;
  items: T[] = [];
  items$ = new Subscription();
  tableActions: PoTableAction[] = [];

  private titleService: Title;
  protected poNotification: PoNotificationService;

  constructor(
    protected injector: Injector,
    protected resourceService: BaseResourceServiceFull<T>,
    @Inject(String) protected title: string
  ) {
    this.titleService = injector.get(Title);
    this.poNotification = injector.get(PoNotificationService);
  }

  ngOnInit(): void {
    this.getItems();
    this.onInitPage();
    this.onInitTable();
  }

  ngOnDestroy(): void {
    this.items$.unsubscribe();
  }

  onInitPage(): void {
    this.actions = this.getActions();
    this.setPageTitle(this.title);
  }

  onInitTable(): void {
    this.tableActions = this.getTableActions();
    this.columns = this.getColumns();
  }

  getColumns(): Array<PoTableColumn> {
    return this.resourceService.getColumns();
  }

  setPageTitle(title: string): void {
    this.titleService.setTitle(`DSLABs | ${title}`);
  }

  getItems(search?: string): void {
    this.items$ = this.resourceService.getAll()
      .pipe(
        tap(() => {
          this.items = [];
          this.isLoading = true;
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: resource => {
          if (search) {
            this.items = this.handleSearch(resource, search)
          } else  {
           this.items = resource;
          }
        },
        error: () => this.poNotification.error('Falha ao carregar Lista')
      })
  }

  onSearchResources(search: string): void {
    this.getItems(search);
  }

  abstract getActions(): PoPageAction[];
  abstract getTableActions(): PoTableAction[];
  abstract handleSearch(resource: T[], search: string): T[];
}
