import { AfterViewInit, Directive, HostListener, Injector, Input, OnInit } from '@angular/core';
import { BaseResourceServiceFull } from '@app/shared/services/base-resource-full.service';
import { PoTableAction, PoTableColumn } from '@po-ui/ng-components';

@Directive()
export abstract class BaseResourceTable<T> implements AfterViewInit, OnInit {
  @Input() isLoading = true;
  @Input() items: T[] = [];
  actions: PoTableAction[] = [];
  columns: PoTableColumn[] = [];
  height: number = 400;

  constructor(
    protected injector: Injector,
    protected resourceService: BaseResourceServiceFull<T>
  ) {}

  ngOnInit(): void {
    this.columns = this.getColumns();
    this.actions = this.getActions();
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  getColumns(): Array<PoTableColumn> {
    return this.resourceService.getColumns();
  }

  @HostListener('window:resize')
  onResize(): void {
    setTimeout(() => this.setHeight(), 200);
  }

  setHeight(): void {
    let elements = [];

    elements.push(this.getElementHeightById('.po-menu-mobile po-clickable'));
    elements.push(this.getElementHeightById('.filter-input'));
    elements.push(this.getElementHeightById('.po-button'));
    elements.push(this.getElementHeightById('.po-page-header'));
    elements.push(this.getElementHeightById('.toolbar'));
    elements.push(this.getElementHeightById('.po-table-subtitle-footer-container'));

    this.height = this.calculateHeight(elements) - 175;
  }

  getElementHeightById(id: string): number {
    const el = document.querySelector(id);
    return el ? el.clientHeight : 0;
  }

  calculateHeight(elements: number[]): number {
    return elements.reduce((amount, currency) => amount - currency, window.innerHeight);
  }

  abstract getActions(): PoTableAction[];
}
