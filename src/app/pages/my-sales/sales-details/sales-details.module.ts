import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { TotalModule } from './../total/total.module';
import { GeneralDataComponent } from './general-data/general-data.component';
import { ItemsComponent } from './items/items.component';
import { SalesDetailsComponent } from './sales-details.component';

@NgModule({
  declarations: [
    SalesDetailsComponent,
    GeneralDataComponent,
    ItemsComponent
  ],
  imports: [
    SharedModule,
    TotalModule
  ]
})
export class SalesDetailsModule { }
