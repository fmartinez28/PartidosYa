import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutPageComponent } from '../shared/pages/main-layout-page/main-layout-page.component';
import { HomeComponent } from './components/home/home.component';
import { CanchasPlaceholderComponent } from './components/canchas-placeholder/canchas-placeholder.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { isUserLogged, isUserNotLogged } from '../session/guards/auth.guard';
<<<<<<< HEAD
import { ComunidadesHomeComponent } from '../comunidades/components/comunidades-home/comunidades-home.component';
import { ComunidadesModule } from '../comunidades/comunidades.module';
=======
>>>>>>> c74da364edfc8ba97bb85d8d18e752b4459ebecc
import { PartidosComponent } from './components/partidos/partidos.component';

const routes: Routes = [{
  path: '',
  component: MainLayoutPageComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },

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
<<<<<<< HEAD
      path: 'comunidades',
      loadChildren: () => import('../comunidades/comunidades.module').then(m => m.ComunidadesModule),
    },
    {
=======
>>>>>>> c74da364edfc8ba97bb85d8d18e752b4459ebecc
      path: 'partidos',
      component: PartidosComponent,
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
