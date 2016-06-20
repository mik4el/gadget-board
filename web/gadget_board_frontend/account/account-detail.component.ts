import { Component, OnInit } from '@angular/core';
import { RouteParams, Router, CanActivate } from '@angular/router-deprecated';
import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';

import { Account } from './account';
import { AccountService } from './account.service';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'account-detail',
    moduleId: __moduleName,
    templateUrl: './account-detail.component.html',
})

@CanActivate(() => tokenNotExpired())

export class AccountDetailComponent implements OnInit {

    errorMessages: any[];
    account: Account;
    isAccountOwner = false;
    urlUsername: string;
    formIsActive = true; // temporary workaround for angular2 to reset form
    accountUpdated = false;

    constructor(
        private accountService: AccountService,
        private routeParams: RouteParams, 
        private router: Router)
    {}

    ngOnInit() {
        // Get account
        this.urlUsername = this.routeParams.get('username')+"";
        this.getAccount(this.urlUsername);
    }
    
    updateAccount() {
        this.accountService.updateAccount(this.account)
            .subscribe(
                account => {
                    this.refreshAccount(account);
                    this.accountUpdated = true;
                },
                errors => this.errorMessages = <any[]>errors);
    }
    
    getAccount(username: string) {
        this.accountService.getAccount(username)
            .subscribe(
                account => this.refreshAccount(account),
                errors => this.errorMessages = <any[]>errors);
    }

    deleteAccount() {
        this.accountService.deleteAccount(this.account)
            .subscribe(
                res => {
                    this.accountService.logout();
                    this.router.navigate(['GadgetList']);},
                errors => this.errorMessages = <any[]>errors
                );
    }

    refreshAccount(account: Account) {
        this.account = account;
        if (account.id == this.accountService.loggedInUserAccountId()) {
            this.isAccountOwner = true;
        }
        this.formIsActive = false;  // temporary workaround for angular2 to reset form
        setTimeout(()=> this.formIsActive=true, 0);  // temporary workaround for angular2 to reset form
        this.errorMessages = <any>[];
    }

}