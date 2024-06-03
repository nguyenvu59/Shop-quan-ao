import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient,
    private _configService: ConfigService,
  ) { }

  reportController() {
    let url: string = `${this._configService.url}/report`;
    return {
      orderbydate: (params: any) => {
        return this.http.get(`${url}/orderbydate`, {
          params: params,
        });
      },
      productbydate: (params: any) => {
        return this.http.get(`${url}/productbydate`, {
          params: params,
        });
      },
      totalbydate: (params: any) => {
        return this.http.get(`${url}/totalbydate`, {
          params: params,
        });
      },
    };
  }
}
