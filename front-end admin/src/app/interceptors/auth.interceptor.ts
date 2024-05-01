import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('request :', request);
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*',
        'Accept-Language': 'vn',
        // Authorization: `Bearer ${this._storageService.getToken()}`,
      },
    });
    if (request.url?.includes('/file/upload') || request.url?.includes('/storage/upload')) {
      request = request.clone({ headers: request.headers.delete('Accept', '*/*') });
      request = request.clone({ headers: request.headers.delete('Content-Type', 'application/json') });
    }
    // Clone the request with updated headers   
    console.log('request :', request);
    return next.handle(request);
  }
}
