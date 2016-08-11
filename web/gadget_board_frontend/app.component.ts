import { Component, OnDestroy } from '@angular/core';
import './rxjs-operators';
import { Subscription } from 'rxjs/Subscription';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from '@angular/router-deprecated';
import { JwtHelper } from 'angular2-jwt/angular2-jwt'

import { AccountService } from './account/account.service';
import { AccountCreateComponent } from './account/account-create.component';
import { AccountLoginComponent } from './account/account-login.component';
import { AccountListComponent } from './account/account-list.component';
import { AccountDetailComponent } from './account/account-detail.component';

import { GadgetService } from './gadget/gadget.service';
import { GadgetListComponent } from './gadget/gadget-list.component';
import { GadgetDetailComponent } from './gadget/gadget-detail.component';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'my-app',
    moduleId: __moduleName,
    templateUrl: './app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        AccountService,
        JwtHelper,
        GadgetService
    ]
})

@RouteConfig([
    {
        path: '/gadgets/',
        name: 'GadgetList',
        component: GadgetListComponent,
        useAsDefault: true
    },
    {
        path: '/gadgets/:gadget_slug',
        name: 'GadgetDetail',
        component: GadgetDetailComponent
    },
    {
        path: '/gadgets/:gadget_slug/:mode',
        name: 'GadgetDetailMode',
        component: GadgetDetailComponent
    },
    {
        path: '/accounts/create',
        name: 'AccountCreate',
        component: AccountCreateComponent
    },
    {
        path: '/accounts/',
        name: 'AccountList',
        component: AccountListComponent
    },
    {
        path: '/accounts/login',
        name: 'AccountLogin',
        component: AccountLoginComponent
    },
    {
        path: '/accounts/detail/:username',
        name: 'AccountDetail',
        component: AccountDetailComponent
    }
])

export class AppComponent implements OnDestroy {
    isLoggedIn: boolean;
    subscription: Subscription;

    constructor(
        private accountService: AccountService,
        private router: Router
    ) {
        this.isLoggedIn = accountService.isLoggedIn(); // make sure component is instantiated with status
        this.subscription = accountService.isLoggedIn$.subscribe(
            status => {
                this.isLoggedIn = status;
        })
    }
    
    logout() {
        this.accountService.logout();
        this.router.navigate(['GadgetList']);
    }

    ngOnDestroy(){
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    }
}