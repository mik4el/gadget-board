import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';

@Injectable()
export class AccountGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate() {
        if (tokenNotExpired()) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page
        this.router.navigate(['/accounts/login']);
        return false;
    }
}