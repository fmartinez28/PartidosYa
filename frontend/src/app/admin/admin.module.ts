import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutPageComponent } from './pages/admin-layout-page/admin-layout-page.component';
import { SharedModule } from '../shared/shared.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminUsuariosListComponent } from './components/usuarios-list/usuarios-list.component';
import { AdminUsuariosListViewComponent } from './pages/usuarios-list-view/usuarios-list-view.component';
import { AdminSidebarItemComponent } from './components/admin-sidebar/admin-sidebar-item/admin-sidebar-item.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminUsuarioListItemComponent } from './components/usuarios-list/usuario-list-item/usuario-list-item.component';
import { AdminComunidadesListComponent } from './components/comunidades-list/admin-comunidades-list.component';
import { AdminComunidadesListItemComponent } from './components/comunidades-list/comunidades-list-item/admin-comunidades-list-item.component';
import { AdminComunidadesListViewComponent } from './pages/comunidades-list-view/comunidades-list-view.component';
import { AdminPartidosListComponent } from './components/partidos-list/partidos-list.component';
import { AdminPartidosListViewComponent } from './pages/partidos-list-view/partidos-list-view.component';
import { AdminPartidosListItemComponent } from './components/partidos-list/partidos-list-item/partidos-list-item.component';
import { AdminCanchasListViewComponent } from './pages/canchas-list-view/canchas-list-view.component';
import { AdminCanchasListComponent } from './components/canchas-list/canchas-list.component';
import { AdminCanchasListItemComponent } from './components/canchas-list/canchas-list-item/canchas-list-item.component';


@NgModule({
  declarations: [
    AdminLayoutPageComponent,
    AdminHomeComponent,
    AdminSidebarComponent,
    AdminSidebarItemComponent,
    AdminUsuariosListComponent,
    AdminUsuariosListViewComponent,
    AdminUsuarioListItemComponent,
    AdminComunidadesListComponent,
    AdminComunidadesListItemComponent,
    AdminComunidadesListViewComponent,
    AdminPartidosListComponent,
    AdminPartidosListViewComponent,
    AdminPartidosListItemComponent,
    AdminCanchasListViewComponent,
    AdminCanchasListComponent,
    AdminCanchasListItemComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
