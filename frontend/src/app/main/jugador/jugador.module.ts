import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JugadorRoutingModule } from './jugador-routing.module';
import { CanchasPlaceholderComponent } from '../components/canchas-placeholder/canchas-placeholder.component';


@NgModule({
  declarations: [
    CanchasPlaceholderComponent
  ],
  imports: [
    CommonModule,
    JugadorRoutingModule
  ]
})
export class JugadorModule { }
