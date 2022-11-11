import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared/shared.module';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    AccessDeniedComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [NotFoundComponent, AccessDeniedComponent]
})
export class ErrorsModule { }
