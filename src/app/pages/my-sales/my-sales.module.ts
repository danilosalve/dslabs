import { NgModule } from '@angular/core';
import { DocumentPipe } from '@app/shared/pipe/document.pipe';
import { HomeMySalesModule } from './home-my-sales/home-my-sales.module';
import { MySalesRoutingModule } from './my-sales-routing.module';
import { SalesDetailsModule } from './sales-details/sales-details.module';
import { SalesFormModule } from './sales-form/sales-form.module';
import { SalesHeaderGuard } from './shared/guards/sales-header.guard';
import { SalesItemsGuard } from './shared/guards/sales-items.guard';

@NgModule({
  imports: [
    MySalesRoutingModule,
    HomeMySalesModule,
    SalesFormModule,
    SalesDetailsModule
  ],
  providers: [SalesHeaderGuard, SalesItemsGuard, DocumentPipe]
})
export class MySalesModule { }
