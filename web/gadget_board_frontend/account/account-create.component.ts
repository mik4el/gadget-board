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
    newAccount: Account;

    constructor(
        private accountService: AccountService) {
    }

    ngOnInit() {
        this.getAccounts();
        this.clearForm();
    }

    getAccounts() {
        this.accountService.getAccounts()
            .subscribe(
            accounts => this.accounts = accounts,
            error =>  this.errorMessage = <any>error);
    }

    createAccount () {
        if (!this.newAccount.username) { return; }
        if (!this.newAccount.password) { return; }
        this.accountService.createAccount(
            this.newAccount.username,
            this.newAccount.password,
            this.newAccount.email)
            .subscribe(
                account  => this.accountCreated(account),
                error =>  this.errorMessage = <any>error);
    }

    accountCreated(account: Account) {
        this.accounts.push(account);
        this.clearForm();
    }

    clearForm () {
        this.newAccount = new Account();
        this.errorMessage = "";
    }
}