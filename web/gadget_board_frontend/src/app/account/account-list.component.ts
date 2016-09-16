import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';

import { Account } from './account';
import { AccountService } from './account.service';

@Component({
    selector: 'account-list',
    templateUrl: './account-list.component.html',
})

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
        this.router.navigate(['/accounts/detail', account.username]);
    }

}