import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PoModule,
    PoTemplatesModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    PoModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    PoTemplatesModule
  ]
})
export class SharedModule { }
