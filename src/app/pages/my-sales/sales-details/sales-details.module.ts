import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SalesDetailsComponent } from './sales-details.component';
import { GeneralDataComponent } from './general-data/general-data.component';
import { ItemsComponent } from './items/items.component';
import { TotalComponent } from './general-data/total/total.component';

@NgModule({
  declarations: [
    SalesDetailsComponent,
    GeneralDataComponent,
    ItemsComponent,
    TotalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SalesDetailsModule { }
