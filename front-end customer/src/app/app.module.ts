import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ProductComponent } from './page/product/product.component';
import { AccountComponent } from './page/account/account.component';
import { WishlistComponent } from './page/wishlist/wishlist.component';
import { ShopPageComponent } from './page/shop-page/shop-page.component';
import { EcommerceComponent } from './page/ecommerce/ecommerce.component';
import { ShopCartComponent } from './page/shop-cart/shop-cart.component';
import { IonicModule } from '@ionic/angular';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { OrderComponent } from './page/detail-user/order/order.component';
import { ContenDetailUserComponent } from './page/detail-user/conten-detail-user/conten-detail-user.component';

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    AccountComponent,
    WishlistComponent,
    ShopPageComponent,
    EcommerceComponent,
    ShopCartComponent,
    OrderComponent,
    ContenDetailUserComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FontAwesomeModule,
    IonicModule.forRoot({})
  ],
  providers: [
    { provide: NZ_I18N, useValue: vi_VN },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
