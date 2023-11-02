import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutPageComponent } from '../shared/pages/main-layout-page/main-layout-page.component';
import { HomeComponent } from './components/home/home.component';
import { CanchasPlaceholderComponent } from './components/canchas-placeholder/canchas-placeholder.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'session',
    loadChildren: () => import('../session/session.module').then(m => m.SessionModule)
  },

  {
    path: 'canchas',
    component: CanchasPlaceholderComponent, // TODO hacer que no se pueda entrar a este si no hay login
  },

  { path: 'login', redirectTo: 'session/login' },
  { path: 'signup', redirectTo: 'session/signup' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
