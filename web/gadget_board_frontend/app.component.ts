import { Component }       from '@angular/core';
import './rxjs-operators';

import { HeroService }     from './hero/hero.service';
import { HeroesComponent } from './heroes/heroes.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero/hero-detail.component';
import { AccountService } from './account/account.service';
import { AccountCreateComponent } from './account/account-create.component';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'my-app',
    moduleId: __moduleName,
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a [routerLink]="['Dashboard']">Dashboard</a>
            <a [routerLink]="['Heroes']">Heroes</a>
            <a [routerLink]="['CreateAccount']">Create Account</a>
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
        path: '/accounts/create-account',
        name: 'CreateAccount',
        component: AccountCreateComponent
    }
])

export class AppComponent {
  title = 'Tour of Heroes';
}