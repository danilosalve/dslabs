import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared/shared.module';
import { ToolbarModule } from './../toolbar/toolbar.module';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [SharedModule, ToolbarModule],
  exports: [MenuComponent]
})
export class MenuModule { }
