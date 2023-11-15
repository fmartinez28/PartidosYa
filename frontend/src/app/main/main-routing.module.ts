import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutPageComponent } from '../shared/pages/main-layout-page/main-layout-page.component';
import { HomeComponent } from './components/home/home.component';
import { CanchasPlaceholderComponent } from './components/canchas-placeholder/canchas-placeholder.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { isUserLogged, isUserNotLogged } from '../session/guards/auth.guard';
import { ComunidadesModule } from '../comunidades/comunidades.module';
import { HomeLayoutPageComponent } from '../shared/pages/home-layout-page/home-layout-page.component';

const routes: Routes = [
  
  {
    path: 'home',
    component: HomeLayoutPageComponent,
    children:
    [
      { path: '', component: HomeComponent }
    ]
  },

  {
  path: '',
  component: MainLayoutPageComponent,
  children: [
    {
      path: 'session',
      loadChildren: () => import('../session/session.module').then(m => m.SessionModule),
      canMatch: [isUserNotLogged]
    },

    {
      path: 'canchas',
      component: CanchasPlaceholderComponent, // TODO hacer que no se pueda entrar a este si no hay login
      canMatch: [isUserLogged]
    },
    {
      path: 'comunidades',
      loadChildren: () => import('../comunidades/comunidades.module').then(m => m.ComunidadesModule),
    },
    {
      path: 'partidos',
      loadChildren: () => import('../partidos/partidos.module').then(m => m.PartidosModule),
      canMatch: [isUserLogged]
    },

    { path: 'login', redirectTo: 'session/login' },
    { path: 'signup', redirectTo: 'session/signup' },
    { path: 'notfound', component: NotFoundComponent },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
