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
<<<<<<< HEAD
import { PartidosJoinedComponent } from './components/partidos-joined/partidos-joined.component';
import { PartidoModalComponent } from './partido-modal/partido-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
=======
>>>>>>> ad1cbd6 (Muchos, muchos cambios, reestructuración con pages en vez de components, agregada funcionalidad de search, particionado home en Mis Partidos y Buscar Partidos)



@NgModule({
  declarations: [
    PartidoFormComponent,
    PartidosComponent,
    PartidoComponent,
    PartidosHomeComponent,
<<<<<<< HEAD
    PartidosSearchComponent,
    PartidosJoinedComponent,
    PartidoModalComponent
=======
    PartidosSearchComponent
>>>>>>> ad1cbd6 (Muchos, muchos cambios, reestructuración con pages en vez de components, agregada funcionalidad de search, particionado home en Mis Partidos y Buscar Partidos)
  ],
  imports: [
    CommonModule,
    PartidosRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule,
<<<<<<< HEAD
    FormsModule,
=======
    FormsModule
>>>>>>> ad1cbd6 (Muchos, muchos cambios, reestructuración con pages en vez de components, agregada funcionalidad de search, particionado home en Mis Partidos y Buscar Partidos)
  ]
})
export class PartidosModule { }
