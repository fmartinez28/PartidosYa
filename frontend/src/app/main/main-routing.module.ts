import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutPageComponent } from '../shared/pages/main-layout-page/main-layout-page.component';
import { HomeComponent } from './components/home/home.component';
import { CanchasPlaceholderComponent } from './components/canchas-placeholder/canchas-placeholder.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
  { path: 'notfound', component: NotFoundComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
