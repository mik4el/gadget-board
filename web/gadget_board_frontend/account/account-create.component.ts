import { Component, OnInit } from '@angular/core';
import { Account } from './account';
import { AccountService } from './account.service';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'account-create',
    moduleId: __moduleName,
    templateUrl: './account-create.component.html',
    styleUrls: ['./account-create.component.css']
})

export class AccountCreateComponent implements OnInit {

    errorMessage: string;
    accounts: Account[];
    constructor(
        private accountService: AccountService) {
    }

    ngOnInit() { this.getAccounts(); }

    getAccounts() {
        this.accountService.getAccounts()
            .subscribe(
            accounts => this.accounts = accounts,
            error =>  this.errorMessage = <any>error);
    }

    createAccount (username: string, password: string, email: string) {
        if (!username) { return; }
        if (!password) { return; }
        this.accountService.createAccount(username, password, email)
            .subscribe(
                account  => console.log(account),
                error =>  this.errorMessage = <any>error);
    }
}