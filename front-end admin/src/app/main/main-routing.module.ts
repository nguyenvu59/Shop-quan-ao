import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AdminComponent } from './account/admin/admin.component';
import { CustomerComponent } from './account/customer/customer.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
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
