import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SettingsListComponent } from './settings-list/settings-list.component';
import { SettingTableComponent } from './settings-list/setting-table/setting-table.component';

@NgModule({
  declarations: [SettingsListComponent, SettingTableComponent],
  imports: [SharedModule]
})
export class HomeMySettingsModule { }
