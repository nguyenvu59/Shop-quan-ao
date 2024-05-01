import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AdminComponent } from './account/admin/admin.component';
import { CustomerComponent } from './account/customer/customer.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { VoucherComponent } from './voucher/voucher.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'supplier', pathMatch: 'full' },
      {
        path: "category", component: CategoryComponent,      
      },
      {
        path: "order", component: OrderComponent,     
      },
      {
        path: "product", component: ProductComponent,       
      },
      {
        path: "supplier", component: SupplierComponent,      
      },
      {
        path: "voucher", component: VoucherComponent,    
      },
      {
        path: "account-admin", component: AdminComponent,        
      },
      {
        path: "account-customer", component: CustomerComponent,       
      },      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
