import { Account } from './account';

describe('Account', () => {

  it('has username', () => {
    let account: Account = new Account();
    account.username = "username";
    expect(account.username).toEqual('username');
  });

  it('has password', () => {
    let account: Account = new Account();
    account.password = "password";
    expect(account.password).toEqual('password');
  });

});