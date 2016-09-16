import * as Raven from 'raven-js';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AUTH_PROVIDERS } from 'angular2-jwt/angular2-jwt';

import { AppComponent }  from './app.component';
import { routing,
    appRoutingProviders } from './app.routing';
import { GadgetModule }  from './gadget/gadget.module';
import { AccountModule }  from './account/account.module';
import { PageNotFoundComponent } from './page-not-found.component'

import { ErrorHandler } from '@angular/core';

Raven
    .config('https://bf263cc32a26472d9906a232f15f9663@sentry.io/99202')
    .install();

class RavenErrorHandler extends ErrorHandler {
  handleError(err:any) {
    while ( err && err.originalError ) {
      err = err.originalError;
    }
    Raven.captureException(err);
    console.error("Error sent to Sentry");
    let defaultErrorHandler = new ErrorHandler();
    defaultErrorHandler.handleError(err);
  }
}

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
    appRoutingProviders,
    {provide: ErrorHandler, useClass: RavenErrorHandler}
  ]
})
export class AppModule { }