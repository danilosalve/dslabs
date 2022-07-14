import { SalesListComponent } from './home-my-sales/sales-list/sales-list.component';
import { SalesDetailsComponent } from './sales-details/sales-details.component';
import { SalesFormComponent } from './sales-form/sales-form.component';
import { SalesHeaderGuard } from './shared/guards/sales-header.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesItemsGuard } from './shared/guards/sales-items.guard';

const routes: Routes = [
  {
    path: '',
    component: SalesListComponent,
    data: {
      title: 'Meus Pedidos'
    }
  },
  {
    path: 'new',
    component: SalesFormComponent,
    data: {
      title: 'Novo Pedidos'
    }
  },
  {
    path: 'view/:id',
    component: SalesDetailsComponent,
    data: {
      title: 'Detalhe do Pedido de Venda'
    },
    resolve: {
      header: SalesHeaderGuard,
      items: SalesItemsGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MySalesRoutingModule {}
