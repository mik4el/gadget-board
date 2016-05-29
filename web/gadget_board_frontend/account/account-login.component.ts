import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { AccountService } from './account.service';
import { Subscription }   from 'rxjs/Subscription';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'account-login',
    moduleId: __moduleName,
    templateUrl: './account-login.component.html',
    styleUrls: ['./account-login.component.css']
})

export class AccountLoginComponent implements OnDestroy {
    errorMessage: string;
    isLoggedIn = false;
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

    login(email: string, password: string) {
        this.accountService
            .login(email, password)
            .subscribe(
                result => {
                    this.router.navigate(['../Dashboard']);
                },
                error =>  this.errorMessage = <any>error
            );
    }

    logout() {
        this.accountService.logout();
    }

    ngOnDestroy(){
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    }
}