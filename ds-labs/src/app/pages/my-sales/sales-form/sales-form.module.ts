import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { GeneralDataComponent } from './general-data/general-data.component';
import { SalesFormComponent } from './sales-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-list/product-card/product-card.component';

@NgModule({
  declarations: [
    SalesFormComponent,
    GeneralDataComponent,
    ProductListComponent,
    ProductCardComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SalesFormModule { }
