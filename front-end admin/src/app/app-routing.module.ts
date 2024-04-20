import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SingUpComponent } from './auth/sing-up/sing-up.component';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
  },
  // {
  //   path: 'singup',
  //   component: SingUpComponent,
  // },

  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
