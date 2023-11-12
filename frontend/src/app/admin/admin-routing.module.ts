import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutPageComponent } from './pages/admin-layout-page/admin-layout-page.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UsuariosListViewComponent } from './pages/usuarios-list-view/usuarios-list-view.component';

const routes: Routes = [
  {
    component: AdminLayoutPageComponent,
    path: '',
    children: [
      { path: 'home', component: AdminHomeComponent, pathMatch: 'full' },
      { path: 'usuarios', component: UsuariosListViewComponent, pathMatch: 'full'},
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
