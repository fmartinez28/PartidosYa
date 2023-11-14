import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidosRoutingModule } from './partidos.routing.module';
import { PartidoFormComponent } from './components/partido-form/partido-form.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { PartidoComponent } from './components/partido/partido.component';



@NgModule({
  declarations: [
    PartidoFormComponent,
    PartidosComponent,
    PartidoComponent
  ],
  imports: [
    CommonModule,
    PartidosRoutingModule
  ]
})
export class PartidosModule { }
