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
import { AdminComponent } from './account/admin/admin.component';
import { CustomerComponent } from './account/customer/customer.component';
import { StorageService } from '../services/storage.service';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzInputModule } from 'ng-zorro-antd/input';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    MainComponent,
    AdminComponent,
    CustomerComponent
  ],
  imports: [    
    CommonModule,    
    MainRoutingModule,
    NzLayoutModule,
    IconsProviderModule,
    NzMenuModule,
    HttpClientModule,
    NzNotificationModule,
    NzPageHeaderModule,
    NzTableModule,
    NzPaginationModule,
    NzModalModule,
    NzButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzInputModule
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
