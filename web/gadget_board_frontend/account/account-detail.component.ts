import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Account } from './account';
import { AccountService } from './account.service';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'account-detail',
    moduleId: __moduleName,
    templateUrl: './account-detail.component.html',
    styleUrls: ['./account-detail.component.css']
})

export class AccountDetailComponent implements OnInit {

    errorMessage: string;
    account: Account;
    isAccountOwner = false;
    urlUsername: string;

    constructor(
        private accountService: AccountService,
        private routeParams: RouteParams) 
    {}

    ngOnInit() {
        // Get account
        this.urlUsername = this.routeParams.get('username')+"";
        this.getAccount(this.urlUsername);
    }
    
    updateAccount() {
        this.accountService.updateAccount(this.account)
            .subscribe(
            account => this.refreshAccount(account),
            error =>  this.errorMessage = <any>error);
    }
    
    getAccount(username: string) {
        this.accountService.getAccount(username)
            .subscribe(
            account => this.refreshAccount(account),
            error =>  this.errorMessage = <any>error);
    }

    refreshAccount(account: Account) {
        this.account = account;
        if (account.id == this.accountService.loggedInUserAccountId()) {
            this.isAccountOwner = true;
        }
        this.errorMessage = "";
    }   

}