import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutPageComponent } from './pages/admin-layout-page/admin-layout-page.component';
import { SharedModule } from '../shared/shared.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminUsuariosListComponent } from './components/admin-usuarios-list/admin-usuarios-list.component';
import { AdminUsuariosListViewComponent } from './pages/admin-usuarios-list-view/admin-usuarios-list-view.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminUsuarioListItemComponent } from './components/admin-usuarios-list/admin-usuario-list-item/admin-usuario-list-item.component';
import { AdminComunidadesListComponent } from './components/admin-comunidades-list/admin-comunidades-list.component';
import { AdminComunidadesListItemComponent } from './components/admin-comunidades-list/admin-comunidades-list-item/admin-comunidades-list-item.component';
import { AdminComunidadesListViewComponent } from './pages/admin-comunidades-list-view/admin-comunidades-list-view.component';
import { AdminPartidosListComponent } from './components/admin-partidos-list/admin-partidos-list.component';
import { AdminPartidosListViewComponent } from './pages/admin-partidos-list-view/admin-partidos-list-view.component';
import { AdminPartidosListItemComponent } from './components/admin-partidos-list/admin-partidos-list-item/admin-partidos-list-item.component';
import { AdminCanchasListViewComponent } from './pages/admin-canchas-list-view/admin-canchas-list-view.component';
import { AdminCanchasListComponent } from './components/admin-canchas-list/admin-canchas-list.component';
import { AdminCanchasListItemComponent } from './components/admin-canchas-list/admin-canchas-list-item/admin-canchas-list-item.component';


@NgModule({
  declarations: [
    AdminLayoutPageComponent,
    AdminHomeComponent,
    AdminSidebarComponent,
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
