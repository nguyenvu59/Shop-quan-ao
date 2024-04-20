import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AdminComponent } from './account/admin/admin.component';
import { CustomerComponent } from './account/customer/customer.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: "category", component: CategoryComponent,
        data: {
          title: 'Danh mục'
        }
      },
      {
        path: "order", component: OrderComponent,
        data: {
          title: 'Đơn hàng'
        }
      },
      {
        path: "product", component: ProductComponent,
        data: {
          title: 'Sản phẩm'
        }
      },
      {
        path: "supplier", component: SupplierComponent,
        data: {
          title: 'Nhà cung cấp'
        }
      },
      {
        path: "account-admin", component: AdminComponent,
        data: {
          title: 'Tài khoản Admin'
        }
      },
      {
        path: "account-customer", component: CustomerComponent,
        data: {
          title: 'Tài khoản khách hàng'
        }
      },      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
