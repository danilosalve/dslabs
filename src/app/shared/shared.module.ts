import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { BdcWalkModule } from 'bdc-walkthrough';
import { DarkenOnHoverDirective } from './Directives/darken-on-hover.directive';
import { DarkenWithBlueOnHoverDirective } from './Directives/darken-with-blue-on-hover.directive';
import { DragDropItemsDirective } from './Directives/drag-drop-items.directive';
import { FilterInputComponent } from './components/filter-input/filter-input.component';
import { PersonContactFormComponent } from './components/person/person-contact-form/person-contact-form.component';
import { ViewButtonComponent } from './components/view-button/view-button.component';
import { DocumentPipe } from './pipe/document.pipe';

@NgModule({
  declarations: [
    FilterInputComponent,
    DocumentPipe,
    ViewButtonComponent,
    DragDropItemsDirective,
    DarkenOnHoverDirective,
    PersonContactFormComponent,
    DarkenWithBlueOnHoverDirective
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
    PersonContactFormComponent,
    DarkenWithBlueOnHoverDirective
  ]
})
export class SharedModule { }
