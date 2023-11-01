import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainLayoutPageComponent } from './pages/main-layout-page/main-layout-page.component';


@NgModule({
  declarations: [
    MainLayoutPageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
