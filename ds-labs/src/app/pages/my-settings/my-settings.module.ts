import { NgModule } from '@angular/core';
import { HomeMySettingsModule } from './home-my-settings/home-my-settings.module';
import { MySettingsRoutingModule } from './my-settings-routing.module';
import { SettingFormModule } from './setting-form/setting-form.module';
import { FieldGuard } from './shared/guards/field.guard';
import { TableGuard } from './shared/guards/table.guard';

@NgModule({
  imports: [
    MySettingsRoutingModule,
    HomeMySettingsModule,
    SettingFormModule
  ],
  providers: [FieldGuard, TableGuard]
})
export class MySettingsModule { }
