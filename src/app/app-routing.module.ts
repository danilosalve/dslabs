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
