import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { GeneralDataComponent } from './general-data/general-data.component';
import { SalesFormComponent } from './sales-form.component';

@NgModule({
  declarations: [
    SalesFormComponent,
    GeneralDataComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SalesFormModule { }
