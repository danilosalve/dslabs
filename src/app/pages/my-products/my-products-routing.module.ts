import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './home-my-products/product-list/product-list.component';


const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    data: {
      title: 'Meus Produtos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProductsRoutingModule {}
