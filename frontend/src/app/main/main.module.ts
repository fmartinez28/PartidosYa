import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CanchasPlaceholderComponent } from './components/canchas-placeholder/canchas-placeholder.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WorspacePageComponent } from './pages/worspace-page/worspace-page.component';
import { SharedModule } from '../shared/shared.module';
import { PartidosComponent } from '../partidos/components/partidos/partidos.component';
import { PartidoComponent } from '../partidos/components/partido/partido.component';

@NgModule({
  declarations: [
    HomeComponent,
    CanchasPlaceholderComponent,
    NotFoundComponent,
    WorspacePageComponent,
    PartidosComponent,
    PartidoComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
