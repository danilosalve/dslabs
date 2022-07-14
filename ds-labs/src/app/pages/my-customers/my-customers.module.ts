import { NgModule } from '@angular/core';
import { DocumentPipe } from './../../shared/pipe/document.pipe';
import { HomeMyCustomersModule } from './home-my-customers/home-my-customers.module';
import { MyCustomersRoutingModule } from './my-customers-routing.module';

@NgModule({
  imports: [
    MyCustomersRoutingModule,
    HomeMyCustomersModule
  ],
  providers: [DocumentPipe]
})
export class MyCustomersModule { }
