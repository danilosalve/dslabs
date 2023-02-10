import { NgModule } from '@angular/core';
import { HomeMyProspectsModule } from './home-my-prospects/home-my-prospects.module';
import { MyProspectsRoutingModule } from './my-prospects-routing.module';

@NgModule({
  imports: [
    MyProspectsRoutingModule,
    HomeMyProspectsModule
  ]
})
export class MyProspectsModule { }
