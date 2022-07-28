import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [SharedModule],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
