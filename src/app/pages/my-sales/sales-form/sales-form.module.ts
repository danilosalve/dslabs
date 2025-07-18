import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { GeneralDataComponent } from './general-data/general-data.component';
import { DragDropProductsComponent } from './product-list/drag-drop-products/drag-drop-products.component';
import { MoreInformationComponent } from './product-list/product-card/more-information/more-information.component';
import { ProductBalanceComponent } from './product-list/product-card/more-information/product-balance/product-balance.component';
import { ProductCardComponent } from './product-list/product-card/product-card.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SaleSummaryModule } from './sale-summary/sale-summary.module';
import { SalesFormComponent } from './sales-form.component';

@NgModule({
  declarations: [
    SalesFormComponent,
    GeneralDataComponent,
    ProductListComponent,
    ProductCardComponent,
    MoreInformationComponent,
    ProductBalanceComponent,
    DragDropProductsComponent
  ],
  imports: [
    SharedModule,
    SaleSummaryModule
  ]
})
export class SalesFormModule { }
