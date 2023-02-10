import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProspectListComponent } from './home-my-prospects/prospect-list/prospect-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProspectListComponent,
    data: {
        title: 'Meus Prospects'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProspectsRoutingModule { }
