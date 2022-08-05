import { AfterViewInit, Directive, HostListener, Injector, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { BaseResourceServiceFull } from '../services/base-resource-full.service';
import { DEVICE_BUTTON_STYLE } from './view-button/view-button.component';

@Directive()
export abstract class BaseResourceList<T> implements OnInit, OnDestroy, AfterViewInit {
  actions: PoPageAction[] = [];
  columns: Array<PoTableColumn> = [];
  isLoading = true;
  items: T[] = [];
  items$ = new Subscription();
  tableActions: PoTableAction[] = [];
  titlePage = '';
  tableHeight: number = 400;
  isSmartPhone = false;
  classDevice: string = DEVICE_BUTTON_STYLE;

  private titleService: Title;
  protected poNotification: PoNotificationService;
  protected activatedroute: ActivatedRoute;

  constructor(
    protected injector: Injector,
    protected resourceService: BaseResourceServiceFull<T>
  ) {
    this.activatedroute = injector.get(ActivatedRoute);
    this.poNotification = injector.get(PoNotificationService);
    this.titleService = injector.get(Title);
  }

  ngAfterViewInit(): void {
    this.onResize();

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
    this.setPageTitle();
  }

  onInitTable(): void {
    this.tableActions = this.getTableActions();
    this.columns = this.getColumns();
  }

  getColumns(): Array<PoTableColumn> {
    return this.resourceService.getColumns();
  }

  setPageTitle(): void {
    this.activatedroute.data.subscribe(res => {
      this.titlePage = res['title'];
      this.titleService.setTitle(`DSLABs | ${res['title']}`);
    });
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

  @HostListener('window:resize')
  onResize(): void {
    setTimeout(() => this.setTableHeight(), 200);
  }

  setTableHeight(): void {
    let elements = [];

    elements.push(this.getElementHeightById('.po-menu-mobile po-clickable'));
    elements.push(this.getElementHeightById('.filter-input'));
    elements.push(this.getElementHeightById('.po-button'));
    elements.push(this.getElementHeightById('.po-page-header'));
    elements.push(this.getElementHeightById('.toolbar'));
    elements.push(this.getElementHeightById('.po-table-subtitle-footer-container'));

    this.tableHeight = this.calculateTableHeight(elements) - 175;
  }

  getElementHeightById(id: string): number {
    const el = document.querySelector(id);
    return el ? el.clientHeight : 0;
  }

  calculateTableHeight(elements: number[]): number {
    return elements.reduce((amount, currency) => amount - currency, window.innerHeight);
  }

  onChangeDevice(device: {isSmartphone: boolean, class: string}): void {
    setTimeout(() => {
      this.classDevice = device.class;
      this.isSmartPhone = device.isSmartphone;
    }, 1000);
  }

  abstract getActions(): PoPageAction[];
  abstract getTableActions(): PoTableAction[];
  abstract handleSearch(resource: T[], search: string): T[];
}
