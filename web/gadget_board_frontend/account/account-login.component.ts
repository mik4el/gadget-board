import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { AccountService } from './account.service';
import { Subscription }   from 'rxjs/Subscription';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'account-login',
    moduleId: __moduleName,
    templateUrl: './account-login.component.html',
})

export class AccountLoginComponent implements OnDestroy {
    errorMessages: any[];
    isLoggedIn = false;
    subscription: Subscription;
    formIsActive = true; // temporary workaround for angular2 to reset form

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

    login(username: string, password: string) {
        this.accountService
            .login(username, password)
            .subscribe(
                result => {
                    this.router.navigate(['GadgetList']);
                    this.formIsActive = false;  // temporary workaround for angular2 to reset form
                    setTimeout(()=> this.formIsActive=true, 0);  // temporary workaround for angular2 to reset form
                },
                errors => this.errorMessages = <any[]>errors);
    }

    logout() {
        this.accountService.logout();
    }

    ngOnDestroy(){
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    }
}