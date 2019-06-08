import { Component, OnDestroy } from '@angular/core';
import './rxjs-operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    AccountService,
  ]
})

export class AppComponent implements OnDestroy {
  isLoggedIn: boolean;
  subscription: Subscription;
  isCollapsed: boolean;

  constructor(
      private accountService: AccountService,
      private router: Router
  ) {
    this.isCollapsed = false;
    this.isLoggedIn = false;
    this.isLoggedIn = accountService.isLoggedIn(); // make sure component is instantiated with status
    this.subscription = accountService.isLoggedIn$.subscribe(
        status => {
          this.isLoggedIn = status;
        })

  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/gadgets']);
  }

  ngOnDestroy(){
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}