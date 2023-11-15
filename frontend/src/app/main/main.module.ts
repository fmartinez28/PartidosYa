import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/components/home/home.component';
import { NotFoundComponent } from './home/components/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './home/components/about/about.component';

@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
