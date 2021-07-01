import { Injectable } from '@angular/core';
import decode from 'jwt-decode';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorage {

  constructor() { }

  clear() {
    localStorage.clear();
  }

  public saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  // public getRole(){
  //   const tokenPayload=decode(this.getToken());
  //   return tokenPayload['role'];
  // }



}