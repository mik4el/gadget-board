import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AUTH_PROVIDERS } from 'angular2-jwt/angular2-jwt';

import { AppComponent }  from './app.component';
import { routing,
         appRoutingProviders } from './app.routing';
import { GadgetModule }  from './gadget/gadget.module';
import { AccountModule }  from './account/account.module';
import { PageNotFoundComponent } from './page-not-found.component'

@NgModule({
	imports: [ 
		BrowserModule, 
		routing,
		GadgetModule,
		AccountModule
	],
	declarations: [ AppComponent, PageNotFoundComponent ],
	bootstrap: [ AppComponent ],
	providers: [ 
 		AUTH_PROVIDERS,
		appRoutingProviders
	]
})
export class AppModule { }