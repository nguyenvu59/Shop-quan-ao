import { CartService } from './services/cart.service';
import { Component, DoCheck, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faBars, faClosedCaptioning, faHeart, faSearch, faShoppingCart, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
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
export class AppComponent implements OnInit, DoCheck {
  faUser = faUser;
  faSearch = faSearch;
  faHeart = faHeart;
  faShoppingCart = faShoppingCart;
  faBars = faBars;
  faTimes = faTimes;

  formRegister!: FormGroup;
  formLogin!: FormGroup;

  token: string | null = '';
  user: any = {};
  quantityCart: number = 0;
  openModalRegister: boolean = false;
  openModalLogin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _authService: AuthService,
    private _customersService: CustomersService,
    private _cartService: CartService,
    private _storageService: StorageService,
  ) { }

  ngOnInit(): void {
    initFlowbite();
    this.initFormLogin();
    this.initFormRegister();
    this.token = this._storageService.getToken();
    this.user = this._storageService.getUser();
    this._cartService.cartController().getCartForCustomer(this.user.id).subscribe(
      (res: any) => {
        this._storageService.saveQuantityCart(res.Data.total_product_value);
        this.quantityCart = res.Data.total_product_value;
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error?.Data, "Thông báo");
        }
      }
  }

  ngDoCheck() {
    this.user = this._storageService.getUser();
    this.quantityCart = +`${this._storageService.getQuantityCart()}`;
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

  handerModalRegister() {
    this.formRegister.reset();
    this.openModalRegister = true;
  }

  closeModalRegister() {
    this.openModalRegister = false;
  }

  handerModalLogin() {
    this.formLogin.reset();
    this.openModalLogin = true;
  }

  closeModalLogin() {
    this.openModalLogin = false;
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
        this.handerModalLogin();
        this.closeModalRegister();
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
        // this._storageService.saveQuantityCart();
        this.token = this._storageService.getToken();
        this.user = this._storageService.getUser();
        this._cartService.cartController().getCartForCustomer(this.user.id).subscribe(
          (res: any) => {
            this._storageService.saveQuantityCart(res.Data.total_product_value);
            this.quantityCart = res.Data.total_product_value;
          }
        ),
          (error: any) => {
            if (error?.Data) {
              this.toastr.error(error?.Data, "Thông báo");
            }
          }
        this.closeModalLogin();
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
