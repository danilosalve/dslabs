import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ProspectListComponent } from './prospect-list/prospect-list.component';
import { ProspectTableComponent } from './prospect-list/prospect-table/prospect-table.component';

@NgModule({
  declarations: [
    ProspectListComponent,
    ProspectTableComponent
  ],
  imports: [ SharedModule ]
})
export class HomeMyProspectsModule { }
