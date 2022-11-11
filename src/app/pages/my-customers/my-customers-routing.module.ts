import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from './../../core/permissions/permission.guard';
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
    },
    canActivate: [PermissionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [Permissions, PermissionGuard]
})
export class MyCustomersRoutingModule {}
