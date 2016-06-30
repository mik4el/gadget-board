import {
  describe,
  expect,
  it,
  inject,
  beforeEachProviders
} from '@angular/core/testing';

import {HTTP_PROVIDERS, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {provide} from '@angular/core';
import { AuthHttp, AUTH_PROVIDERS, JwtHelper } from 'angular2-jwt/angular2-jwt'
import '../rxjs-operators';

import { Account } from './account';
import { AccountService } from './account.service';

describe('AccountService', () => {

    beforeEachProviders(() => {
    return [
        HTTP_PROVIDERS,
        provide(XHRBackend, {useClass: MockBackend}),
        AccountService,
        AuthHttp,
        AUTH_PROVIDERS,
        JwtHelper
    ];
  });

  it('should get accounts when logged in',
    inject([XHRBackend, AccountService], (mockBackend: any, accountService: any) => {

    // first we register a mock response - when a connection
    // comes in, we will respond by giving it an array of (one)
    // account entries
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
              body: [
                {
                  id: 2,
                  username: "username"
                }]
            }
          )));
      });

    // make sure we have a jwt because this requires login, NB: requires a non expired jwt
    localStorage.setItem('id_token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Im1pazRlbC40bmRlcnNzb25AZ21haWwuY29tIiwidXNlcm5hbWUiOiJtaWs0ZWwiLCJvcmlnX2lhdCI6MTQ2NzMxNDAyNiwiZXhwIjoxNDY4NTIzNjI2fQ.1VQZzno1Q8Rax23kZgyPXjXQyEUWgrzb3navPc3njhE");

    // with our mock response configured, we now can
    // ask the account service to get our account entries
    // and then test them
    accountService.getAccounts().subscribe((accounts: Account[]) => {
      expect(accounts.length).toBe(1);
      expect(accounts[0].id).toBe(2);
    });

    localStorage.removeItem('id_token');

  }));
});