import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ProductListViewComponent } from './product-list/product-list-view/product-list-view.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductTableComponent } from './product-list/product-table/product-table.component';

@NgModule({
  declarations: [ProductListComponent, ProductListViewComponent, ProductTableComponent],
  imports: [ SharedModule ]
})
export class HomeMyProductsModule { }
