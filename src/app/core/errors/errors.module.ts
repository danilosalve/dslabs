import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [NotFoundComponent]
})
export class ErrorsModule { }
