import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { AdvancedFilterComponent } from './advanced-filter/advanced-filter.component';
import { FilterResourceComponent } from './filter-resource/filter-resource.component';
import { QuickResourceFilterComponent } from './quick-resource-filter/quick-resource-filter.component';
import { SettingFormComponent } from './setting-form.component';
import { ListResourceComponent } from './list-resource/list-resource.component';
import { TableResourceComponent } from './list-resource/table-resource/table-resource.component';
import { ListViewResourceComponent } from './list-resource/list-view-resource/list-view-resource.component';

@NgModule({
    declarations: [SettingFormComponent, AdvancedFilterComponent, QuickResourceFilterComponent, FilterResourceComponent, ListResourceComponent, TableResourceComponent, ListViewResourceComponent],
    imports: [SharedModule]
})
export class SettingFormModule {}
