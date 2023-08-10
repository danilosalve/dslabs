import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceOrderComponent } from './home-my-billing/invoice-order/invoice-order.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceOrderComponent,
    data: {
      title: 'Meus Faturamentos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyBillingsRoutingModule { }
