import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidosRoutingModule } from './partidos.routing.module';
import { PartidoFormComponent } from './components/partido-form/partido-form.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { PartidoComponent } from './components/partido/partido.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { PartidosHomeComponent } from './pages/partidos-home/partidos-home.component';
import { PartidosSearchComponent } from './components/partidos-search/partidos-search.component';



@NgModule({
  declarations: [
    PartidoFormComponent,
    PartidosComponent,
    PartidoComponent,
    PartidosHomeComponent,
    PartidosSearchComponent
  ],
  imports: [
    CommonModule,
    PartidosRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule,
    FormsModule
  ]
})
export class PartidosModule { }
