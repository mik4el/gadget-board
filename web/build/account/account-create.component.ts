import { Component } from '@angular/core';
import { Router, CanActivate } from '@angular/router-deprecated';
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';

import { Account } from './account';
import { AccountService } from './account.service';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'account-create',
    moduleId: __moduleName,
    template:'<div class=container><h3>Create account</h3><div *ngFor="let errorMessage of errorMessages"><div class="alert alert-danger">{{errorMessage}}</div></div><form *ngIf=formIsActive (ngSubmit)=createAccount() #createAccountForm=ngForm><div class=form-group><label>Username</label> <input type=text class=form-control required [(ngModel)]=newAccount.username ngControl=username #username=ngForm><div [hidden]="username.valid || username.pristine" class="alert alert-danger">Username is required</div></div><div class=form-group><label>Email</label> <input type=text class=form-control required [(ngModel)]=newAccount.email ngControl=email #email=ngForm><div [hidden]="email.valid || email.pristine" class="alert alert-danger">Email is required</div></div><div class=form-group><label>Password</label> <input type=password class=form-control required [(ngModel)]=newAccount.password ngControl=password #password=ngForm><div [hidden]="password.valid || password.pristine" class="alert alert-danger">Password is required</div></div><button type=submit class="btn btn-default" [disabled]=!createAccountForm.form.valid>Submit</button></form></div>',
})

@CanActivate(() => !tokenNotExpired())

export class AccountCreateComponent {

    errorMessages: any[];
    newAccount: Account;
    formIsActive = true; // temporary workaround for angular2 to reset form

    constructor(
        private accountService: AccountService,
        private router: Router) {
        this.newAccount = new Account();
    }

    createAccount () {
        if (!this.newAccount.username) { return; }
        if (!this.newAccount.password) { return; }
        if (!this.newAccount.email) { return; }
        this.accountService.createAccount(
            this.newAccount.username,
            this.newAccount.password,
            this.newAccount.email)
            .subscribe(
                account  => {
                    this.router.navigate(['AccountDetail', { username: account.username }]);
                    this.formIsActive = false;  // temporary workaround for angular2 to reset form
                    setTimeout(()=> this.formIsActive=true, 0);  // temporary workaround for angular2 to reset form
                },
                errors => this.errorMessages = <any[]>errors);
    }

}