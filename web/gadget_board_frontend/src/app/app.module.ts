import * as Raven from 'raven-js';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule } from '@auth0/angular-jwt';

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

export class RavenErrorHandler extends ErrorHandler {
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

export function tokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    GadgetModule,
    AccountModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    })
  ],
  declarations: [ AppComponent, PageNotFoundComponent ],
  bootstrap: [ AppComponent ],
  providers: [
    appRoutingProviders,
    {provide: ErrorHandler, useClass: RavenErrorHandler}
  ]
})
export class AppModule { }