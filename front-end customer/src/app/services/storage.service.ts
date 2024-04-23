import { Injectable } from '@angular/core';

const keyToken = 'token';
const keyUser = 'user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  signOut(): void {
    localStorage.clear();    
  }

  getToken() {
    return localStorage.getItem(keyToken);
  }

  saveToken(token: string) {
    localStorage.setItem(keyToken, token);
  }

  getUser() {    
    const user = localStorage.getItem(keyUser);
    if (user) {      
      return JSON.parse(user);
    }
    return {};
  }

  saveUser(user: any) {
    localStorage.setItem(keyUser, JSON.stringify(user));
  }
}
