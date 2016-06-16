import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { AccountService } from './account.service';
import { Subscription }   from 'rxjs/Subscription';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'account-login',
    moduleId: __moduleName,
    template:'<div class=container><h3>Login</h3><div *ngFor="let errorMessage of errorMessages"><div class="alert alert-danger">{{errorMessage}}</div></div><form *ngIf="formIsActive && !isLoggedIn" (ngSubmit)="login(username.value, password.value)" #loginForm=ngForm><div class=form-group><label>Username</label> <input type=text class=form-control required ngControl=username #username=ngForm><div [hidden]="username.valid || username.pristine" class="alert alert-danger">Username is required</div></div><div class=form-group><label>Password</label> <input type=password class=form-control required ngControl=password #password=ngForm><div [hidden]="password.valid || password.pristine" class="alert alert-danger">Password is required</div></div><button type=submit class="btn btn-default" [disabled]=!loginForm.form.valid>Login</button></form><button *ngIf=isLoggedIn (click)=logout() class="btn btn-default">Logout</button></div>',
})

export class AccountLoginComponent implements OnDestroy {
    errorMessages: any[];
    isLoggedIn = false;
    subscription: Subscription;
    formIsActive = true; // temporary workaround for angular2 to reset form

    constructor(
        private accountService: AccountService,
        private router: Router
    ) {
        this.isLoggedIn = accountService.isLoggedIn(); // make sure component is instantiated with status
        this.subscription = accountService.isLoggedIn$.subscribe(
            status => {
                this.isLoggedIn = status;
        })
    }

    login(email: string, password: string) {
        this.accountService
            .login(email, password)
            .subscribe(
                result => {
                    this.router.navigate(['../Dashboard']);
                    this.formIsActive = false;  // temporary workaround for angular2 to reset form
                    setTimeout(()=> this.formIsActive=true, 0);  // temporary workaround for angular2 to reset form
                },
                errors => this.errorMessages = <any[]>errors);
    }

    logout() {
        this.accountService.logout();
    }

    ngOnDestroy(){
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    }
}