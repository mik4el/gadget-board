import { Component, OnDestroy } from '@angular/core';
import './rxjs-operators';
import { Subscription } from 'rxjs/Subscription';
import { JwtHelper } from 'angular2-jwt/angular2-jwt'
import { Router } from '@angular/router';

import { AccountService } from './account/account.service';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'my-app',
    moduleId: __moduleName,
    templateUrl: './app.component.html',
    providers: [
        AccountService,
        JwtHelper
    ]
})

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