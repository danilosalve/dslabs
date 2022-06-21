import { SalesListComponent } from './home-my-sales/sales-list/sales-list.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SalesListComponent,
    data: {
      title: 'Meus Pedidos',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MySalesRoutingModule {}
