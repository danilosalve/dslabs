import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PoListViewAction } from '@po-ui/ng-components';

@Directive()
export abstract class BaseResourceListView<T> implements OnInit {
  @Input() isLoading = true;
  @Input() items: T[] = [];
  @Input() propertyTitle = '';
  @Output() titleAction = new EventEmitter();
  actions: PoListViewAction[] = [];

  ngOnInit(): void {
    this.actions = this.getActions();
  }

  handleTitleAction($event: T): void {
    this.titleAction.emit($event);
  }

  abstract getActions(): PoListViewAction[];
}
