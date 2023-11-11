import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutPageComponent } from './pages/admin-layout-page/admin-layout-page.component';
import { SharedModule } from '../shared/shared.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UsuariosListComponent } from './components/usuarios-list/usuarios-list.component';
import { UsuariosListViewComponent } from './pages/usuarios-list-view/usuarios-list-view.component';
import { UsuarioListItemComponent } from './components/usuario-list-item/usuario-list-item.component';


@NgModule({
  declarations: [
    AdminLayoutPageComponent,
    AdminHomeComponent,
    UsuariosListComponent,
    UsuariosListViewComponent,
    UsuarioListItemComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
