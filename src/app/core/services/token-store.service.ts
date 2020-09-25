import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { KEYS_CONSTANT } from '../../constants/keys.contstant';
@Injectable({
  providedIn: 'root'
})
export class TokenStoreService {

  constructor() { }

  public storeToken(responseObj: any): void {
    if (!responseObj) { return; }

    this.removeToken();
    // const expiresAt = moment().add(responseObj.auth.expires);
    localStorage.setItem(KEYS_CONSTANT.accessToken, responseObj.auth.token);
    localStorage.setItem(KEYS_CONSTANT.tokenExpires, responseObj.auth.expires);

  }

  public getToken(): any {
    return window.localStorage.getItem(KEYS_CONSTANT.accessToken);
  }

  public removeToken(): void {
    window.localStorage.removeItem(KEYS_CONSTANT.accessToken);
    window.localStorage.removeItem(KEYS_CONSTANT.tokenExpires);
  }

  public logout(): void {
    this.removeToken();
  }

  public isLoggedIn(): boolean {
    const expiration = localStorage.getItem(KEYS_CONSTANT.tokenExpires);
    const expiresAt = JSON.parse(expiration);
    return Date.now() < expiresAt;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }
}
