import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [SharedModule],
  exports: [MenuComponent]
})
export class MenuModule { }
