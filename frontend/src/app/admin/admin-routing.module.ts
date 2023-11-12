import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutPageComponent } from './pages/admin-layout-page/admin-layout-page.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UsuariosListViewComponent } from './pages/usuarios-list-view/usuarios-list-view.component';
import { ComunidadesListViewComponent } from './pages/comunidades-list-view/comunidades-list-view.component';
import { PartidosListViewComponent } from './pages/partidos-list-view/partidos-list-view.component';
import { CanchasListViewComponent } from './pages/canchas-list-view/canchas-list-view.component';

const routes: Routes = [
  {
    component: AdminLayoutPageComponent,
    path: '',
    children: [
      { path: 'home', component: AdminHomeComponent, pathMatch: 'full' },
      { path: 'usuarios', component: UsuariosListViewComponent, pathMatch: 'full'},
      { path: 'comunidades', component: ComunidadesListViewComponent, pathMatch: 'full'},
      { path: 'partidos', component: PartidosListViewComponent, pathMatch: 'full'},
      { path: 'canchas', component: CanchasListViewComponent, pathMatch: 'full'},
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
