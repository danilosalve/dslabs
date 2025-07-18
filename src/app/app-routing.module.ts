import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './core/errors/access-denied/access-denied.component';
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
    path: 'prospects',
    loadChildren: () => import('./pages/my-prospects/my-prospects.module').then(
      m => m.MyProspectsModule
    )
  },
  {
    path: 'contacts',
    loadChildren: () => import('./pages/my-contacts/my-contacts.module').then(
      m => m.MyContactsModule
    )
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/my-products/my-products.module').then(
      m => m.MyProductsModule
    )
  },
  {
    path: 'sales',
    loadChildren: () => import('./pages/my-sales/my-sales.module').then(
      m => m.MySalesModule
    )
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/my-settings/my-settings.module').then(
      m => m.MySettingsModule
    )
  },
  {
    path: 'invoices',
    loadChildren: () => import('./pages/my-billings/my-billings.module').then(
      m => m.MyBillingsModule
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
    path: "access-denied",
    component: AccessDeniedComponent,
    data: {
      title: 'Acesso Negado'
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
