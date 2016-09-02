import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AUTH_PROVIDERS } from 'angular2-jwt/angular2-jwt';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing,
         appRoutingProviders } from './app.routing';
import { GadgetModule }  from './gadget/gadget.module';
import { AccountModule }  from './account/account.module';

@NgModule({
	imports: [ 
		BrowserModule, 
		routing,
		GadgetModule,
		AccountModule
	],
	declarations: [ AppComponent],
	bootstrap: [ AppComponent ],
	providers: [ 
		HTTP_PROVIDERS, 
		AUTH_PROVIDERS,
		appRoutingProviders
	]
})
export class AppModule { }