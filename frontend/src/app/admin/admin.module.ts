import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutPageComponent } from './pages/admin-layout-page/admin-layout-page.component';
import { SharedModule } from '../shared/shared.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UsuariosListComponent } from './components/usuarios-list/usuarios-list.component';
import { UsuariosListViewComponent } from './pages/usuarios-list-view/usuarios-list-view.component';
import { AdminSidebarItemComponent } from './components/admin-sidebar/admin-sidebar-item/admin-sidebar-item.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { UsuarioListItemComponent } from './components/usuarios-list/usuario-list-item/usuario-list-item.component';
import { ComunidadesListComponent } from './components/comunidades-list/comunidades-list.component';
import { ComunidadesListItemComponent } from './components/comunidades-list/comunidades-list-item/comunidades-list-item.component';
import { ComunidadesListViewComponent } from './pages/comunidades-list-view/comunidades-list-view.component';
import { PartidosListComponent } from './components/partidos-list/partidos-list.component';
import { PartidosListViewComponent } from './pages/partidos-list-view/partidos-list-view.component';
import { PartidosListItemComponent } from './components/partidos-list/partidos-list-item/partidos-list-item.component';
import { CanchasListViewComponent } from './pages/canchas-list-view/canchas-list-view.component';
import { CanchasListComponent } from './components/canchas-list/canchas-list.component';
import { CanchasListItemComponent } from './components/canchas-list/canchas-list-item/canchas-list-item.component';


@NgModule({
  declarations: [
    AdminLayoutPageComponent,
    AdminHomeComponent,
    AdminSidebarComponent,
    AdminSidebarItemComponent,
    UsuariosListComponent,
    UsuariosListViewComponent,
    UsuarioListItemComponent,
    ComunidadesListComponent,
    ComunidadesListItemComponent,
    ComunidadesListViewComponent,
    PartidosListComponent,
    PartidosListViewComponent,
    PartidosListItemComponent,
    CanchasListViewComponent,
    CanchasListComponent,
    CanchasListItemComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
