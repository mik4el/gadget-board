import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AccountGuard implements CanActivate {
 
    constructor(
        private router: Router,
        public jwtHelper: JwtHelperService ) { }
    
    canActivate() {
        if (this.jwtHelper.isTokenExpired()) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page
        this.router.navigate(['/accounts/login']);
        return false;
    }
}