import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SalesDetailsComponent } from './sales-details.component';
import { GeneralDataComponent } from './general-data/general-data.component';
import { ItemsComponent } from './items/items.component';

@NgModule({
  declarations: [
    SalesDetailsComponent,
    GeneralDataComponent,
    ItemsComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SalesDetailsModule { }
