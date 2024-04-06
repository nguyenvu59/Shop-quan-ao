import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { IconsProviderModule } from '../icons-provider.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NzLayoutModule,
    IconsProviderModule,
    NzMenuModule
  ]
})
export class MainModule { }
