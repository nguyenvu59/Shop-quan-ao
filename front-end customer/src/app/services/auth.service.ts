import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private _configService: ConfigService,
  ) { }

  authController() {
    let url: string = `${this._configService.url}/customers`;
    return {
      login: (data: any) => {
        return this.http.post(`${url}/login`, data);
      },
    };
  }


}
