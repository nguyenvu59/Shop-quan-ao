import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { TypeNotification } from '../common/enum';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private notification: NzNotificationService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        //   return throwError(error);

        if (error.status === HttpStatusCode.Unauthorized) {
          // TODO: if error at path refresh token then throw error
          if (error.url?.includes('/public/refresh-token')) {
            // this._tokenStorageService.signOut();
            // this.router.navigateByUrl('/auth/login');
            return throwError(error);
          }
          return throwError(error);
          // return this._authenService
          //   .public()
          //   .refresh_token({
          //     refreshToken:
          //       this._dataGlobalService.getCurrentUser()?.refreshToken,
          //   })
          //   .pipe(
          //     switchMap((response: any) => {
          //       // localStorage.setItem('auth', JSON.stringify(response));
          //       // this._tokenStorageService.saveToken(JSON.stringify(response.accessToken));
          //       // this._dataGlobalService.saveToken(
          //       //   this._tokenStorageService.getToken()
          //       // );
          //       // return next.handle(
          //       //   httpRequest.clone({
          //       //     setHeaders: {
          //       //       Authorization: `Bearer ${response.accessToken}`,
          //       //     },
          //       //   })
          //       // );
          //     }),
          //     catchError((err: any) => {
          //       return throwError(error);
          //     })
          //   );
        } else if (error.status === HttpStatusCode.Forbidden) {
          // this.router.navigate(['/no-permission']);
          // this.router.navigateByUrl('/home/no-permission');
          return throwError(error);
        } else if (error.status === HttpStatusCode.BadRequest) {
          if (error.error?.Data) {
            this.notification.create(
              TypeNotification.error,
              'Thông báo',
              `${error.error?.Data}`
            );
          }
          return throwError(error);
        }
        else if (error.status === HttpStatusCode.InternalServerError) {
          if (error.error?.Data) {
            this.notification.create(
              TypeNotification.error,
              'Thông báo',
              `${error.error?.Data}`
            );
          }
          return throwError(error);
        }
        else if (error.status === 0) {
          console.log('error :', error);
          if (error?.message) {
            this.notification.create(
              TypeNotification.error,
              'Thông báo',
              `${error?.message}`
            );
          }
          // this._tokenStorageService.signOut();
          // this.router.navigateByUrl('/auth/login');
          return throwError(error);
        } else {
          console.log('Thoát');
          return throwError(error);
        }
      })
    );
  }
}
