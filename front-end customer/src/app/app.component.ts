import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faBars, faHeart, faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { initFlowbite } from 'flowbite';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth.service';
import { CustomersService } from './services/customers.service';
import { deepCopy } from './common/globalFC';
import { StorageService } from './services/storage.service';
import { jwtDecode } from "jwt-decode";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  faUser = faUser;
  faSearch = faSearch;
  faHeart = faHeart;
  faShoppingCart = faShoppingCart;
  faBars = faBars;

  formRegister!: FormGroup;
  formLogin!: FormGroup;

  token: string|null = '';
  user:any = {};

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _authService: AuthService,
    private _customersService: CustomersService,
    private _storageService: StorageService,
  ) { }

  ngOnInit(): void {
    initFlowbite();
    this.initFormLogin();
    this.initFormRegister();
    this.token = this._storageService.getToken();
    this.user = this._storageService.getUser();
  }

  @HostListener('window:storage')
  onStorageChange() {
    console.log('change...');
  }

  initFormRegister() {
    this.formRegister = this.fb.group({
      name: null,
      email: null,
      password: null,
      confirm: null,
      phone_number: null,
      address: null,
    })
  }

  initFormLogin() {
    this.formLogin = this.fb.group({
      email: null,
      password: null,
    })
  }

  onActivate(event: any) {
    document.getElementsByClassName('overflow-y-auto')[0].scrollTo(0, 0);
  }

  register() {
    if (this.formRegister.value.password !== this.formRegister.value.confirm) {
      this.toastr.error("mật khẩu và Nhập lại mật khẩu không giống nhau", "Thông báo");
      return
    }
    let formRegister: any = deepCopy(this.formRegister.value);
    delete formRegister.confirm
    this._customersService.customerController().create(formRegister).subscribe(
      (res: any) => {
        this.toastr.success("Đăng ký thành công", "Thông báo");
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error?.Data, "Thông báo");
        }
      }
  }

  login() {
    this._authService.authController().login(this.formLogin.value).subscribe(
      (res: any) => {
        this.toastr.success("Đăng nhập thành công", "Thông báo");
        let decodedToken: any = jwtDecode(res.Data);
        this._storageService.saveToken(res.Data);
        this._storageService.saveUser(decodedToken);
        this.token = this._storageService.getToken();
        this.user = this._storageService.getUser();
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error?.Data, "Thông báo");
        }
      }
  }

  logout() {
    this.toastr.success("Đăng xuất thành công", "Thông báo");
    this._storageService.signOut();
    this.token = this._storageService.getToken();
    console.log('this.token :', this.token);
    this.user = this._storageService.getUser();
  }
}
