import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { PoListViewAction, PoTableAction } from '@po-ui/ng-components';

@Directive()
export abstract class BaseResourceListView<T> {
  @Input() isLoading = true;
  @Input() items: T[] = [];
  @Input() propertyTitle = '';
  @Output() titleAction = new EventEmitter();
  actions: PoListViewAction[] = [];

  handleTitleAction($event: T): void {
    this.titleAction.emit($event);
  }
}
