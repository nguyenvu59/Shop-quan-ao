import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private http: HttpClient,
    private _configService: ConfigService,
  ) { }

  fileController() {
    let url: string = `${this._configService.url}/file`;
    return {
      search: (imgaeName: string) => {
        return this.http.get(`${url}/image/${imgaeName}`);
      },
      upload: (data: any) => {
        return this.http.post(`${url}/upload`, data);
      },
    };
  }
}
