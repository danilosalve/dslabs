import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { TotalComponent } from './total.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule
  ],
  declarations: [TotalComponent],
  exports: [TotalComponent]
})
export class TotalModule { }
