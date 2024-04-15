import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EcommerceComponent } from './page/ecommerce/ecommerce.component';
import { ShopCartComponent } from './page/shop-cart/shop-cart.component';
import { ShopPageComponent } from './page/shop-page/shop-page.component';
import { ProductComponent } from './page/product/product.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: EcommerceComponent
  },
  {
    path: 'shop-cart',
    component: ShopCartComponent
  },
  {
    path: 'shop-page',
    component: ShopPageComponent
  },
  {
    path: 'product',
    component: ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
