import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutPageComponent } from '../shared/pages/main-layout-page/main-layout-page.component';
import { HomeComponent } from './components/home/home.component';
import { CanchasPlaceholderComponent } from './components/canchas-placeholder/canchas-placeholder.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { isUserJugador, isUserLogged, isUserNotLogged, isUserPropietario } from '../session/guards/auth.guard';
import { HomeLayoutPageComponent } from '../shared/pages/home-layout-page/home-layout-page.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  
  {
    path: 'home',
    component: HomeLayoutPageComponent,
    children:
    [
      { path: '', component: HomeComponent },
    ],
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'notfound', component: HomeLayoutPageComponent, children: [{ path: '', component: NotFoundComponent }] },
  { path: 'aboutus', component: HomeLayoutPageComponent, children: [{ path: '', component: AboutComponent }] },

  {
    path: 'session',
    component: HomeLayoutPageComponent,
    loadChildren: () => import('../session/session.module').then(m => m.SessionModule),
    canMatch: [isUserNotLogged]
  },

  {
    path: '',
    component: MainLayoutPageComponent,
    children: [
      
      // Rutas
      {
        path: 'player', loadChildren: () => import('./jugador/jugador.module').then(m => m.JugadorModule),
        canMatch: [isUserJugador]
      },
      {
        path: 'owner', loadChildren: () => import('./propietario/propietario.module').then(m => m.PropietarioModule),
        canMatch: [isUserPropietario]
      },

      // Redirects por las dudas
      { path: 'login', redirectTo: 'session/login' },
      { path: 'signup', redirectTo: 'session/signup' },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
