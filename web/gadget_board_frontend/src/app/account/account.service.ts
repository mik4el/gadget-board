import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { AuthHttp, tokenNotExpired, JwtHelper } from 'angular2-jwt/angular2-jwt'

import { Account } from './account';
declare var analytics: any;

@Injectable()
export class AccountService {
    private accountsUrl = 'backend/api/v1/accounts/';
    private getTokenUrl = 'backend/api-token-auth/';
    private isLoggedInSource = new Subject<boolean>();

    isLoggedIn$ = this.isLoggedInSource.asObservable();

    constructor (
        private http: Http,
        public authHttp: AuthHttp,
        private jwtHelper: JwtHelper
    ) {}

    isLoggedIn() {
        return tokenNotExpired();
    }

    updateLoginStatus(status: boolean) {
        this.isLoggedInSource.next(status);
    }
    
    login(username: string, password: string) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let body = JSON.stringify({username, password});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.getTokenUrl, body, options)
            .map((res : any) => {
                let data = res.json();
                localStorage.setItem('id_token', data.token);
                this.updateLoginStatus(true);
                let decodedToken = this.jwtHelper.decodeToken(data.token);
                analytics.identify(decodedToken.user_id, {
                  name: decodedToken.username,
                  email: decodedToken.email
                });
                analytics.track('Logged in');
            })
            .catch(this.handleError);
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
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, body: ""});
        return this.authHttp.get(this.accountsUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getAccount (username: string): Observable<Account> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, body: ""});
        return this.authHttp.get(this.accountsUrl+username+"/", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateAccount (account: Account): Observable<Account> {
        let body = JSON.stringify(account);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.authHttp.put(this.accountsUrl+account.username+"/", body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createAccount (username: string,
                 password: string,
                 email: string): Observable<Account> {
        let body = JSON.stringify({username, password, email});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.accountsUrl, body, options)
            .map((res : any) => {
                let data = res.json();
                localStorage.setItem('id_token', data.token)
                this.updateLoginStatus(true);
                return data || { };
            })
            .catch(this.handleError);
    }

    deleteAccount (account: Account): Observable<Response> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, body: ""});
        return this.authHttp.delete(this.accountsUrl+account.username+"/", options)
            .map((res: Response) => {
                return res;
            })
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }
    
    private handleError(error: any) {
        try {
            //if error comes from backend it has a json representation and error is type response
            let errors = error.json();
            let errorMessagesByType = Object.keys(errors).map(function(key){
                return errors[key];
            });
            let errorMessages = [].concat.apply([], errorMessagesByType); //flatten multidimensional array
            return Observable.throw(errorMessages);
        } catch(e) {
            //if not serve it to the view as array
            return Observable.throw([error]);
        }
    }

}