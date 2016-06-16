import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router-deprecated';
import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';

import { Account } from './account';
import { AccountService } from './account.service';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'account-list',
    moduleId: __moduleName,
    template:'<div class=container><h3>Accounts</h3><div *ngFor="let errorMessage of errorMessages"><div class="alert alert-danger">{{errorMessage}}</div></div><div class="grid grid-pad"><div *ngFor="let account of accounts" class=col-1-4><div class="module account" (click)=gotoAccountDetail(account)><h4>{{account.username}}</h4></div></div></div></div>',
    styleUrls: ['./account-list.component.css']
})

@CanActivate(() => tokenNotExpired())

export class AccountListComponent implements OnInit {

    errorMessages: any[];
    accounts: Account[];

    constructor(
        private accountService: AccountService,
        private router: Router)
    {}

    ngOnInit() {
        this.getAccounts();
    }

    getAccounts() {
        this.accountService.getAccounts()
            .subscribe(
            accounts => this.accounts = accounts,
            errors => this.errorMessages = <any[]>errors);
    }

    gotoAccountDetail(account: Account) {
        this.router.navigate(['AccountDetail', { username: account.username }]);
    }

}