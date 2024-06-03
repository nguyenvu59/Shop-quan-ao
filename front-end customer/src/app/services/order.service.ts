import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private _configService: ConfigService,
  ) { }

  orderController() {
    let url: string = `${this._configService.url}/order`;
    return {
      search: () => {
        return this.http.get(`${url}/list`);
      },
      getItem: (id: number) => {
        return this.http.get(`${url}/${id}`);
      },
      create: (data: any) => {
        return this.http.post(`${url}`, data);
      },
      update: (id: number, data: any) => {
        return this.http.put(`${url}/${id}`, data);
      },
      delete: (id: number) => {
        return this.http.delete(`${url}/${id}`);
      },
      cancel: (id: number) => {
        return this.http.get(`${url}/cancel/${id}`);
      },
      craeteVNPAY: (params: any) => {
        return this.http.get(`${url}/createPMURL`, {
          params: params,
        });
      },
    };
  }
}
