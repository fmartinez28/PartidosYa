import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutPageComponent } from './pages/admin-layout-page/admin-layout-page.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminUsuariosListViewComponent } from './pages/admin-usuarios-list-view/admin-usuarios-list-view.component';
import { AdminComunidadesListViewComponent } from './pages/admin-comunidades-list-view/admin-comunidades-list-view.component';
import { AdminPartidosListViewComponent } from './pages/admin-partidos-list-view/admin-partidos-list-view.component';
import { AdminCanchasListViewComponent } from './pages/admin-canchas-list-view/admin-canchas-list-view.component';

const routes: Routes = [
  {
    component: AdminLayoutPageComponent,
    path: '',
    children: [
      { path: 'home', component: AdminHomeComponent, pathMatch: 'full' },
      { path: 'usuarios', component: AdminUsuariosListViewComponent, pathMatch: 'full' },
      { path: 'comunidades', component: AdminComunidadesListViewComponent, pathMatch: 'full' },
      { path: 'partidos', component: AdminPartidosListViewComponent, pathMatch: 'full' },
      { path: 'canchas', component: AdminCanchasListViewComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
