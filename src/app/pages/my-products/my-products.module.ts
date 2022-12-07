import { NgModule } from '@angular/core';
import { HomeMyProductsModule } from './home-my-products/home-my-products.module';
import { MyProductsRoutingModule } from './my-products-routing.module';

@NgModule({
  imports: [
    MyProductsRoutingModule,
    HomeMyProductsModule
  ],
  declarations: []
})
export class MyProductsModule { }
