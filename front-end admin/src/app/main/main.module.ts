import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { IconsProviderModule } from '../icons-provider.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { CustomersService } from '../services/customers.service';
import { CategoryService } from '../services/category.service';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { SupplierService } from '../services/supplier.service';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { HttpErrorInterceptor } from '../interceptors/http-error.interceptor';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { AdminService } from '../services/admin.service';
import { ConfigService } from '../services/config.service';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NzLayoutModule,
    IconsProviderModule,
    NzMenuModule,
    HttpClientModule,
    NzNotificationModule,
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
})
export class MainModule { }
