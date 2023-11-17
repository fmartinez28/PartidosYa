import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropietarioRoutingModule } from './propietario-routing.module';
import { PropietarioCanchasListComponent } from './components/propietario-canchas-list/propietario-canchas-list.component';
import { PropietarioCanchasListItemComponent } from './components/propietario-canchas-list/propietario-canchas-list-item/propietario-canchas-list-item.component';
import { PropietarioCanchasPageComponent } from './pages/propietario-canchas-page/propietario-canchas-page.component';
import { PropietarioCanchasFormComponent } from './components/propietario-canchas-form/propietario-canchas-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import { PropietarioNuevaCanchaPageComponent } from './pages/propietario-nueva-cancha-page/propietario-nueva-cancha-page.component';


@NgModule({
  declarations: [
    PropietarioCanchasListComponent,
    PropietarioCanchasListItemComponent,
    PropietarioCanchasPageComponent,
    PropietarioCanchasFormComponent,
    PropietarioNuevaCanchaPageComponent
  ],
  imports: [
    CommonModule,
    PropietarioRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule
  ]
})
export class PropietarioModule { }
