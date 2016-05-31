import { Component, OnInit } from '@angular/core';
import { Account } from './account';
import { AccountService } from './account.service';
import { Router } from '@angular/router-deprecated';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'account-list',
    moduleId: __moduleName,
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.css']
})

export class AccountListComponent implements OnInit {

    errorMessage: string;
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
            error =>  this.errorMessage = <any>error);
    }

    gotoAccountDetail(account: Account) {
        this.router.navigate(['AccountDetail', { username: account.username }]);
    }

}