import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router-deprecated';
import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';

import { Account } from './account';
import { AccountService } from './account.service';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'account-list',
    moduleId: __moduleName,
    templateUrl: './account-list.component.html',
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