import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TypeNotification } from 'src/app/common/enum';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  token: string | null = '';
  user: any = {};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _authService: AuthService,
    private notification: NzNotificationService,
    private _storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.initFormLogin();
  }

  initFormLogin() {
    this.formLogin = this.fb.group({
      email: null,
      password: null,
    })
  }

  login() {
    this._authService.authController().login(this.formLogin.value).subscribe(
      (res: any) => {
        let decodedToken: any = jwtDecode(res.Data);
        this._storageService.saveToken(res.Data);
        this._storageService.saveUser(decodedToken);
        this.token = this._storageService.getToken();
        this.user = this._storageService.getUser();
        this.router.navigate(["/"]);
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.notification.create(
            TypeNotification.error,
            'Thông báo',
            `${error?.Data}`
          );
        }
      }
  }

}
