import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { Account } from './account';
import { Subscription }   from 'rxjs/Subscription';

@Component({
    selector: 'account-login',
    templateUrl: './account-login.component.html',
})

export class AccountLoginComponent implements OnDestroy {
    errorMessages: any[];
    isLoggedIn = false;
    subscription: Subscription;
    formIsActive = true; // temporary workaround for angular2 to reset form
    account = new Account();

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

    login() {
        this.accountService
            .login(this.account.username, this.account.password)
            .subscribe(
                result => {
                    this.router.navigate(['/gadgets']);
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