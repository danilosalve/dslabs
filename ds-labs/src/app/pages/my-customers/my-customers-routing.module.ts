import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './home-my-customers/customer-list/customer-list.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    data: {
      title: 'Meus Clientes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCustomersRoutingModule {}
