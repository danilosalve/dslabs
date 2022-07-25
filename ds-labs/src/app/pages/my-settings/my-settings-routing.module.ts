import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsListComponent } from './home-my-settings/settings-list/settings-list.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsListComponent,
    data: {
      title: 'Minhas Configurações'
    }
  }/*,
  {
    path: 'edit/:id',
    component: SettingsListComponent,
    data: {
      title: 'Minhas Configurações'
    },
    resolve: {
      header: SalesHeaderGuard,
      items: SalesItemsGuard
    }
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MySettingsRoutingModule { }
