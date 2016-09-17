import {
    Component,
    OnInit,
    HostBinding,
    trigger,
    transition,
    animate,
    style,
    state } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Account } from './account';
import { AccountService } from './account.service';

declare var analytics: any;

@Component({
    selector: 'account-detail',
    templateUrl: './account-detail.component.html',
    styleUrls: ['./account-detail.component.css'],
    animations: [
        trigger('routeAnimation', [
            state('*',
                style({
                    opacity: 1,
                    transform: 'translateX(0)'
                })
            ),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.5s ease-in')
            ]),
            transition('* => void', [
                animate('0.5s ease-out', style({
                    opacity: 0,
                    transform: 'translateY(100%)'
                }))
            ])
        ])
    ]
})

export class AccountDetailComponent implements OnInit {
    @HostBinding('@routeAnimation') get routeAnimation() {
        return true;
    }

    @HostBinding('style.display') get display() {
        return 'block';
    }

    @HostBinding('style.position') get position() {
        return 'absolute';
    }

    errorMessages: any[];
    account: Account;
    isAccountOwner = false;
    urlUsername: string;
    formIsActive = true; // temporary workaround for angular2 to reset form
    accountUpdated = false;

    constructor(
        private accountService: AccountService,
        private router: Router,
        private route: ActivatedRoute 
    )
    {}

    ngOnInit() {
        // Get account
        this.route.params.subscribe( params => {
            if (params['username']) {
                this.urlUsername = params['username']+"";
            }
        });
        this.getAccount(this.urlUsername);
        analytics.track('Showing account detail component', {
            account_detail_component_for: this.urlUsername
        });
    }
    
    updateAccount() {
        this.accountService.updateAccount(this.account)
            .subscribe(
                account => {
                    this.refreshAccount(account);
                    this.accountUpdated = true;
                },
                errors => this.errorMessages = <any[]>errors);
    }
    
    getAccount(username: string) {
        this.accountService.getAccount(username)
            .subscribe(
                account => this.refreshAccount(account),
                errors => this.errorMessages = <any[]>errors);
    }

    deleteAccount() {
        this.accountService.deleteAccount(this.account)
            .subscribe(
                res => {
                    this.accountService.logout();
                    this.router.navigate(['/gadgets']);},
                errors => this.errorMessages = <any[]>errors
                );
    }

    refreshAccount(account: Account) {
        this.account = account;
        if (account.id == this.accountService.loggedInUserAccountId()) {
            this.isAccountOwner = true;
        }
        this.formIsActive = false;  // temporary workaround for angular2 to reset form
        setTimeout(()=> this.formIsActive=true, 0);  // temporary workaround for angular2 to reset form
        this.errorMessages = <any>[];
    }

}