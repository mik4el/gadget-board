import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt/angular2-jwt';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing,
         appRoutingProviders } from './app.routing';

@NgModule({
	imports: [ 
		BrowserModule, 
		FormsModule, 
		HttpModule,
		routing
	],
	declarations: [ AppComponent],
	bootstrap: [ AppComponent ],
	providers: [ 
		HTTP_PROVIDERS, 
		AUTH_PROVIDERS,
		appRoutingProviders,
	]
})
export class AppModule { }