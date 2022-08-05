import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { GeneralDataComponent } from './general-data/general-data.component';
import { MoreInformationComponent } from './product-list/product-card/more-information/more-information.component';
import { ProductBalanceComponent } from './product-list/product-card/more-information/product-balance/product-balance.component';
import { ProductCardComponent } from './product-list/product-card/product-card.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SalesFormComponent } from './sales-form.component';

@NgModule({
  declarations: [
    SalesFormComponent,
    GeneralDataComponent,
    ProductListComponent,
    ProductCardComponent,
    MoreInformationComponent,
    ProductBalanceComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SalesFormModule { }
