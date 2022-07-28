import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsListComponent } from './home-my-settings/settings-list/settings-list.component';
import { SettingFormComponent } from './setting-form/setting-form.component';
import { FieldGuard } from './shared/guards/field.guard';
import { TableGuard } from './shared/guards/table.guard';

const routes: Routes = [
  {
    path: '',
    component: SettingsListComponent,
    data: {
      title: 'Minhas Configurações'
    }
  },
  {
    path: 'edit/:id',
    component: SettingFormComponent,
    data: {
      title: 'Editar Configurações de Sincronismo'
    },
    resolve: {
      table: TableGuard,
      fields: FieldGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MySettingsRoutingModule { }
