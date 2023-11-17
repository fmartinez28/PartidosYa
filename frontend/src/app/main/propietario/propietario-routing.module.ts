import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isUserLogged } from 'src/app/session/guards/auth.guard';
import { PropietarioCanchasPageComponent } from './pages/propietario-canchas-page/propietario-canchas-page.component';
import {
  PropietarioCanchasFormComponent
} from "./components/propietario-canchas-form/propietario-canchas-form.component";

const routes: Routes = [
  {
    path: '',
    children:
      [
        {
          path: 'canchas',
          component: PropietarioCanchasPageComponent, // TODO hacer que no se pueda entrar a este si no hay login
          canMatch: [isUserLogged]
        },
        {
          path: 'nueva-cancha',
          component: PropietarioCanchasFormComponent,
          canMatch: [isUserLogged]
        },
        {
          path: '',
          redirectTo: 'canchas',
          pathMatch: 'full'
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropietarioRoutingModule { }
