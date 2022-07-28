import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SettingFormComponent } from './setting-form.component';
import { AdvancedFilterComponent } from './advanced-filter/advanced-filter.component';

@NgModule({
  declarations: [
    SettingFormComponent,
    AdvancedFilterComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SettingFormModule { }
