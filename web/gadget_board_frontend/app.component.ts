import { Component, OnDestroy } from '@angular/core';
import './rxjs-operators';
import { Subscription } from 'rxjs/Subscription';

import { HeroService } from './hero/hero.service';
import { HeroesComponent } from './heroes/heroes.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero/hero-detail.component';
import { AccountService } from './account/account.service';
import { AccountCreateComponent } from './account/account-create.component';
import { AccountLoginComponent } from './account/account-login.component';
import { AccountListComponent } from './account/account-list.component';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'my-app',
    moduleId: __moduleName,
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a [routerLink]="['Dashboard']">Dashboard</a>
            <a [routerLink]="['Heroes']">Heroes</a>
            <a *ngIf="!isLoggedIn" [routerLink]="['AccountCreate']">Create Account</a>
            <a *ngIf="!isLoggedIn" [routerLink]="['AccountLogin']">Login</a>
            <a *ngIf="isLoggedIn" [routerLink]="['AccountList']">List Accounts</a>
            <a *ngIf="isLoggedIn" href="javascript:void(0)" (click)="logout()">Logout</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    styleUrls: ['./app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HeroService,
        AccountService
    ]
})

@RouteConfig([
    {
        path: '/heroes',
        name: 'Heroes',
        component: HeroesComponent
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/detail/:id',
        name: 'HeroDetail',
        component: HeroDetailComponent
    },
    {
        path: '/accounts/create',
        name: 'AccountCreate',
        component: AccountCreateComponent
    },
    {
        path: '/accounts/list',
        name: 'AccountList',
        component: AccountListComponent
    },
    {
        path: '/accounts/login',
        name: 'AccountLogin',
        component: AccountLoginComponent
    }
])

export class AppComponent implements OnDestroy {
    title = 'Tour of Heroes';
    isLoggedIn: boolean;
    subscription: Subscription;

    constructor(
        private accountService: AccountService
    ) {
        this.isLoggedIn = accountService.isLoggedIn(); // make sure component is instantiated with status
        this.subscription = accountService.isLoggedIn$.subscribe(
            status => {
                this.isLoggedIn = status;
        })
    }
    
    logout() {
        this.accountService.logout();
    }

    ngOnDestroy(){
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    }
}