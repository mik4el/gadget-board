import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt/angular2-jwt';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent }  from './app.component';

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule],       // module dependencies
  declarations: [ AppComponent],   // components and directives
  bootstrap: [ AppComponent ],     // root component
  providers: [ HTTP_PROVIDERS, AUTH_PROVIDERS ]                    // services
})
export class AppModule { }