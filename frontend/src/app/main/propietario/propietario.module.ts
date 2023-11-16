import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropietarioRoutingModule } from './propietario-routing.module';
import { PropietarioCanchasListComponent } from './components/propietario-canchas-list/propietario-canchas-list.component';
import { PropietarioCanchasListItemComponent } from './components/propietario-canchas-list/propietario-canchas-list-item/propietario-canchas-list-item.component';
import { PropietarioCanchasPageComponent } from './pages/propietario-canchas-page/propietario-canchas-page.component';


@NgModule({
  declarations: [
    PropietarioCanchasListComponent,
    PropietarioCanchasListItemComponent,
    PropietarioCanchasPageComponent
  ],
  imports: [
    CommonModule,
    PropietarioRoutingModule
  ]
})
export class PropietarioModule { }
