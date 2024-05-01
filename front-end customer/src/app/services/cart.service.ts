import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient,
    private _configService: ConfigService,
  ) { }

  cartController() {
    let url: string = `${this._configService.url}/cart`;
    return {
      search: (params: any) => {
        return this.http.get(`${url}`, {
          params: params
        });
      },
      getCartForCustomer: (customerId: number) => {
        return this.http.get(`${url}/${customerId}`);
      }, 
      create: (data: any) => {
        return this.http.post(`${url}`, data);
      },
      updateQuantity: (data: any) => {
        return this.http.put(`${url}/update-quantity`, data);
      },
      delete: (id: number) => {
        return this.http.delete(`${url}/${id}`);
      }
    };
  }
}
