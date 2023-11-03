import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CanchasPlaceholderComponent } from './components/canchas-placeholder/canchas-placeholder.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [

    HomeComponent,
    CanchasPlaceholderComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
