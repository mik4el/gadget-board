import { throwError as observableThrowError,  Observable,  Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Account } from './account';
declare var analytics: any;

@Injectable()
export class AccountService {
    private accountsUrl = 'backend/api/v1/accounts/';
    private getTokenUrl = 'backend/api-token-auth/';
    private isLoggedInSource = new Subject<boolean>();

    isLoggedIn$ = this.isLoggedInSource.asObservable();

    constructor (
        private http: HttpClient,
        public jwtHelper: JwtHelperService
    ) {}

    isLoggedIn() {
        return this.jwtHelper.isTokenExpired();
    }

    updateLoginStatus(status: boolean) {
        this.isLoggedInSource.next(status);
    }
    
    login(username: string, password: string) {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        let body = JSON.stringify({username, password});
        return this.http.post(this.getTokenUrl, body, { headers }).pipe(
            map((res : any) => {
                localStorage.setItem('id_token', res.token);
                this.updateLoginStatus(true);
                let decodedToken = this.jwtHelper.decodeToken(res.token);
                analytics.identify(decodedToken.user_id, {
                  name: decodedToken.username,
                  email: decodedToken.email
                });
                analytics.track('Logged in');
            }),
            catchError(this.handleError)
        );
    }

    logout() {
        localStorage.removeItem('id_token');
        this.updateLoginStatus(false);
        analytics.track('Logged out');
    }

    loggedInUserAccountId() {
        if (this.isLoggedIn()) {
            var token = localStorage.getItem('id_token');
            token = this.jwtHelper.decodeToken(token);
            if (token.hasOwnProperty('user_id')) {
                return token['user_id'];
            }
        }
        return false;
    }

    getAccounts (): Observable<Account[]> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get<Account[]>(this.accountsUrl, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    getAccount (username: string): Observable<Account> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get<Account>(this.accountsUrl+username+"/", { headers }).pipe(
            catchError(this.handleError)
        );
    }

    updateAccount (account: Account): Observable<Account> {
        let body = JSON.stringify(account);
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.put<Account>(this.accountsUrl+account.username+"/", body, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    createAccount (username: string,
                 password: string,
                 email: string): Observable<Account> {
        let body = JSON.stringify({username, password, email});
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.accountsUrl, body, { headers }).pipe(
            map((res : any) => {
                let data = res;
                localStorage.setItem('id_token', data.token)
                this.updateLoginStatus(true);
                return data || { };
            }),
            catchError(this.handleError)
        );
    }

    deleteAccount (account: Account): Observable<Response> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.delete(this.accountsUrl+account.username+"/", { headers }).pipe(
            map((res: Response) => {
                return res;
            }),
            catchError(this.handleError)
        );
    }

    private handleError(error: any) {
        try {
            //if error comes from backend it has a json representation and error is type response
            let errors = error.json();
            let errorMessagesByType = Object.keys(errors).map(function(key){
                return errors[key];
            });
            let errorMessages = [].concat.apply([], errorMessagesByType); //flatten multidimensional array
            return observableThrowError(errorMessages);
        } catch(e) {
            //if not serve it to the view as array
            return observableThrowError([error]);
        }
    }

}