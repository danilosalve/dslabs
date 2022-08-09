import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SettingsListComponent } from './settings-list/settings-list.component';
import { SettingTableComponent } from './settings-list/setting-table/setting-table.component';
import { SettingListViewComponent } from './settings-list/setting-list-view/setting-list-view.component';

@NgModule({
  declarations: [SettingsListComponent, SettingTableComponent, SettingListViewComponent],
  imports: [SharedModule]
})
export class HomeMySettingsModule { }
