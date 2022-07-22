import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SettingsListComponent } from './settings-list/settings-list.component';

@NgModule({
  declarations: [SettingsListComponent],
  imports: [SharedModule]
})
export class HomeMySettingsModule { }
