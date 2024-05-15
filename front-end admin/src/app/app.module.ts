import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { CustomersService } from './services/customers.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { SupplierService } from './services/supplier.service';
import { LoginComponent } from './auth/login/login.component';
import { SingUpComponent } from './auth/sing-up/sing-up.component';
import { AdminService } from './services/admin.service';
import { ConfigService } from './services/config.service';
import { StorageService } from './services/storage.service';
import { UploadService } from './services/upload.service';
import { CartService } from './services/cart.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzNotificationModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule
  ],
  providers: [
    AuthService,
    CustomersService,
    CategoryService,
    OrderService,
    ProductService,
    SupplierService,
    AdminService,
    ConfigService,
    StorageService,
    UploadService,
    CartService,
    { provide: NZ_I18N, useValue: vi_VN },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
