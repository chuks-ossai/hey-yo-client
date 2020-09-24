import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStoreService {
  TOKEN_KEY = 'heyyo.token';
  constructor() { }

  public storeToken(token: string): void {
    if (!token) { return; }

    this.removeToken();
    window.localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): any {
    return window.localStorage.getItem(this.TOKEN_KEY);
  }

  public removeToken(): void {
    window.localStorage.removeItem(this.TOKEN_KEY);
  }

}
