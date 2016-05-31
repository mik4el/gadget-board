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

    constructor(
        private accountService: AccountService,
        private routeParams: RouteParams) 
    {}

    ngOnInit() {
        let username = this.routeParams.get('username')+"";
        this.getAccount(username);
    }
    
    getAccount(username: string) {
        this.accountService.getAccount(username)
            .subscribe(
            account => this.account = account,
            error =>  this.errorMessage = <any>error);
    }

}