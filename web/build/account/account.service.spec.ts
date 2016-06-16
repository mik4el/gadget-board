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

    // make sure we have a token because this requires login
    localStorage.setItem('id_token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmlnX2lhdCI6MTQ2NTI4Nzc4MSwiZXhwIjoxNDY2NDk3MzgxLCJ1c2VybmFtZSI6Im1pazRlbCIsInVzZXJfaWQiOjEsImVtYWlsIjoibWlrNGVsLjRuZGVyc3NvbkBnbWFpbC5jb20ifQ.EEMh_IqynLoQwckogsTM2wbk4gt_Z0CBUi_43KcSsgg");

    // with our mock response configured, we now can
    // ask the account service to get our account entries
    // and then test them
    accountService.getAccounts().subscribe((accounts: Account[]) => {
      expect(accounts.length).toBe(1);
      expect(accounts[0].id).toBe(2);
    });

  }));
});