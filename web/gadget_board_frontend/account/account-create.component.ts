import { Component } from '@angular/core';
import { Account } from './account';
import { AccountService } from './account.service';
import { Router } from '@angular/router-deprecated';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'account-create',
    moduleId: __moduleName,
    templateUrl: './account-create.component.html',
    styleUrls: ['./account-create.component.css']
})

export class AccountCreateComponent {

    errorMessage: string;
    newAccount: Account;

    constructor(
        private accountService: AccountService,
        private router: Router) {
        this.newAccount = new Account();
    }

    createAccount () {
        if (!this.newAccount.username) { return; }
        if (!this.newAccount.password) { return; }
        this.accountService.createAccount(
            this.newAccount.username,
            this.newAccount.password,
            this.newAccount.email)
            .subscribe(
                account  => {this.router.navigate(['AccountDetail', { username: account.username }]);},
                error =>  this.errorMessage = <any>error);
    }

}