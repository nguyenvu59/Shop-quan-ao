import { Injectable } from '@angular/core';

const keyToken = 'token';
const keyUser = 'user';
const keyQuantityCart = 'quantityCart';
const keyDetailCart = 'detailCart';
const keyCartItemId = 'cartItemId';

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

  getQuantityCart() {
    return localStorage.getItem(keyQuantityCart);
  }

  saveQuantityCart(quantity: number = 0) {
    localStorage.setItem(keyQuantityCart, `${quantity}`);
  }

  getDetailCart() {
    const value_detail = localStorage.getItem(keyDetailCart);
    if (value_detail) {
      return JSON.parse(value_detail);
    }
    return {};
  }

  saveDetailCart(value_detail: any) {
    localStorage.setItem(keyDetailCart, JSON.stringify(value_detail));
  }

  getCartItemId() {
    return localStorage.getItem(keyCartItemId);
  }

  saveCartItemId(id: number = 0) {
    localStorage.setItem(keyCartItemId, `${id}`);
  }
}
