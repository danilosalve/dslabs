import { NgModule } from '@angular/core';
import { HomeMySettingsModule } from './home-my-settings/home-my-settings.module';
import { MySettingsRoutingModule } from './my-settings-routing.module';

@NgModule({
  imports: [
    MySettingsRoutingModule,
    HomeMySettingsModule
  ]
})
export class MySettingsModule { }
