import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared/shared.module';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [SharedModule],
  exports: [MenuComponent]
})
export class MenuModule { }
