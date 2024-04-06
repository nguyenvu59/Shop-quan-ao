import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EcommerceComponent } from './page/ecommerce/ecommerce.component';
import { ShopCartComponent } from './page/shop-cart/shop-cart.component';
import { ShopPageComponent } from './page/shop-page/shop-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'TrangChu' },
  {
    path: 'TrangChu',
    component: EcommerceComponent
  },
  {
    path: 'shop-cart',
    component: ShopCartComponent
  },
  {
    path: 'shop-page',
    component: ShopPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
