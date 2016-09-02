import { Component, OnDestroy } from '@angular/core';
import './rxjs-operators';
import { Subscription } from 'rxjs/Subscription';
import { JwtHelper } from 'angular2-jwt/angular2-jwt'
import { Router } from '@angular/router';

import { AccountService } from './account/account.service';
import { GadgetService } from './gadget/gadget.service';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'my-app',
    moduleId: __moduleName,
    templateUrl: './app.component.html',
    directives: [],
    providers: [
        AccountService,
        JwtHelper,
        GadgetService
    ]
})

/*
@RouteConfig([
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
        path: '/accounts/detail/:username',
        name: 'AccountDetail',
        component: AccountDetailComponent
    },
    {
        path: '/gadgets/',
        name: 'GadgetList',
        component: GadgetListComponent,
        useAsDefault: true
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
    
])
*/

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
        this.router.navigate(['/gadgets']);
    }

    ngOnDestroy(){
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    }
}