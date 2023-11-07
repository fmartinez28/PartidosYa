import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CanchasPlaceholderComponent } from './components/canchas-placeholder/canchas-placeholder.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WorspacePageComponent } from './pages/worspace-page/worspace-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    CanchasPlaceholderComponent,
    NotFoundComponent,
    WorspacePageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
