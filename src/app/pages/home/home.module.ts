import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeCardsComponent } from './home/home-cards/home-cards.component';
import { HomeChartsComponent } from './home/home-charts/home-charts.component';
import { HomeSalesTableComponent } from './home/home-sales-table/home-sales-table.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent, HomeChartsComponent, HomeSalesTableComponent, HomeCardsComponent]
})
export class HomeModule { }
