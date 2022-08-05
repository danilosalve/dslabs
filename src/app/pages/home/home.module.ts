import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeChartsComponent } from './home/home-charts/home-charts.component';
import { HomeComponent } from './home/home.component';
import { HomeSalesTableComponent } from './home/home-sales-table/home-sales-table.component';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent, HomeChartsComponent, HomeSalesTableComponent]
})
export class HomeModule { }
