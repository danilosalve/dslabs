import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@app-shared/shared.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memory-database';
import { ErrorsModule } from './errors/errors.module';
import { MenuModule } from './menu/menu.module';
import { ToolbarModule } from './toolbar/toolbar.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    MenuModule,
    ErrorsModule,
    ToolbarModule
  ],
  exports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    MenuModule,
    ErrorsModule,
    ToolbarModule
  ]
})
export class CoreModule { }
