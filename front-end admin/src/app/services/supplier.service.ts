import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(
    private http: HttpClient,
    private _configService: ConfigService,
  ) { }

  supplierController() {
    let url: string = `${this._configService.url}/supplier`;
    return {
      search: (params: any) => {
        return this.http.get(`${url}`, {
          params: params
        });
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
      }
    };
  }
}
