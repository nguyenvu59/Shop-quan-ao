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
      search2: (imgaeName: string) => {
        return this.http.get(`${this._configService.urlUPload}/image/${imgaeName}`);
      },
      upload2: (data: any) => {
        return this.http.post(`${this._configService.urlUPload}`, data,{
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBRE1JTl9hYzFhODU0Mi0xNTM3LTRhYzAtODRmMi1kMGY5ZmRiZWIzNzgiLCJleHAiOjE3MTcwODAwOTh9.PA5-eQyHt6Xp2EYG8A3MbzX6GrtfqvTdX126qs-CM94`,
          }
        });
      },
    };
  }
}
