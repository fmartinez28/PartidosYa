import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanchasPlaceholderComponent } from './components/canchas-placeholder/canchas-placeholder.component';
import { isUserLogged } from 'src/app/session/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children:
      [
        {
          path: 'canchas',
          component: CanchasPlaceholderComponent, // TODO hacer que no se pueda entrar a este si no hay login
          canMatch: [isUserLogged]
        },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropietarioRoutingModule { }
