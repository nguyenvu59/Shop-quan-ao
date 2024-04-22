import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private _configService: ConfigService,
  ) { }

  adminController() {
    let url: string = `${this._configService.url}/admin`;
    return {
      search: () => {
        return this.http.get(`${url}`);
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
