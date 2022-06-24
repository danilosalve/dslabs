import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/errors/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(
      m => m.HomeModule
    )
  },
  {
    path: 'customers',
    loadChildren: () => import('./pages/my-customers/my-customers.module').then(
      m => m.MyCustomersModule
    )
  },
  {
    path: 'sales',
    loadChildren: () => import('./pages/my-sales/my-sales.module').then(
      m => m.MySalesModule
    )
  },
  {
    path: "not-found",
    component: NotFoundComponent,
    data: {
      title: 'Pagina não encontrada'
    }
  },
  {
    path: "**",
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
