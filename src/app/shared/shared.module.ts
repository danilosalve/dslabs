import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { BdcWalkModule } from 'bdc-walkthrough';
import { FilterInputComponent } from './components/filter-input/filter-input.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { ViewButtonComponent } from './components/view-button/view-button.component';
import { DarkenOnHoverDirective } from './Directives/darken-on-hover.directive';
import { DragDropItemsDirective } from './Directives/drag-drop-items.directive';
import { DocumentPipe } from './pipe/document.pipe';

@NgModule({
  declarations: [
    FilterInputComponent,
    DocumentPipe,
    ViewButtonComponent,
    DragDropItemsDirective,
    DarkenOnHoverDirective,
    PersonFormComponent
  ],
  imports: [
    CommonModule,
    PoModule,
    PoTemplatesModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    BdcWalkModule
  ],
  exports: [
    CommonModule,
    PoModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    PoTemplatesModule,
    FilterInputComponent,
    BdcWalkModule,
    ViewButtonComponent,
    DragDropItemsDirective,
    DarkenOnHoverDirective,
    PersonFormComponent
  ]
})
export class SharedModule { }
