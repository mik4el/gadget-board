import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { Account } from './account';

@Injectable()
export class AccountService {
    private accountsUrl = 'api/v1/accounts/';
    private getTokenUrl = 'api-token-auth/';
    private isLoggedInSource = new Subject<boolean>();

    isLoggedIn$ = this.isLoggedInSource.asObservable();

    constructor (private http: Http) {
    }

    isLoggedIn() {
        return !!localStorage.getItem('token');
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
                localStorage.setItem('token', data.token);
                this.updateLoginStatus(true);
            })
            .catch(this.handleError);
    }

    logout() {
        localStorage.removeItem('token');
        this.updateLoginStatus(false);
    }

    getAccounts (): Observable<Account[]> {
        return this.http
            .get(this.accountsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createAccount (username: string,
                 password: string,
                 email: string): Observable<Account> {
        let body = JSON.stringify({username, password, email});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http
            .post(this.accountsUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
  }

}