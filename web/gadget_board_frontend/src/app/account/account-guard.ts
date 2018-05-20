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
            // not logged in so return false and redirect to login page
            this.router.navigate(['/accounts/login']);
            return false;
        }
        return true;
    }
}