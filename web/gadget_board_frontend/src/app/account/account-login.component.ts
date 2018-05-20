import {
    Component,
    HostBinding,
    OnDestroy } from '@angular/core';
import {
    trigger,
    transition,
    animate,
    style,
    state } from '@angular/animations';

import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { Account } from './account';
import { Subscription }   from 'rxjs';

@Component({
    selector: 'account-login',
    templateUrl: './account-login.component.html',
    styleUrls: ['./account-login.component.css'],
    animations: [
        trigger('routeAnimation', [
            state('*',
                style({
                    opacity: 1,
                    transform: 'translateX(0)'
                })
            ),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.5s ease-in')
            ]),
            transition('* => void', [
                animate('0.5s ease-out', style({
                    opacity: 0,
                    transform: 'translateY(100%)'
                }))
            ])
        ])
    ]
})

export class AccountLoginComponent implements OnDestroy {
    @HostBinding('@routeAnimation') get routeAnimation() {
        return true;
    }

    @HostBinding('style.display') get display() {
        return 'block';
    }

    @HostBinding('style.position') get position() {
        return 'absolute';
    }

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