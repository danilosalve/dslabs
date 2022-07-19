import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerListComponent } from './home-my-customers/customer-list/customer-list.component';
import { CustomerGuard } from './shared/guards/customer.guard';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    data: {
      title: 'Meus Clientes'
    }
  },
  {
    path: 'view/:id',
    component: CustomerDetailComponent,
    data: {
      title: 'Detalhes do Cliente'
    },
    resolve: {
      customer: CustomerGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCustomersRoutingModule {}
