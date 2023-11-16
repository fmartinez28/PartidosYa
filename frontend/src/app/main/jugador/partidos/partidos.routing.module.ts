import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PartidosComponent } from './components/partidos/partidos.component';
import { PartidoFormComponent } from './components/partido-form/partido-form.component';
import { PartidosHomeComponent } from './pages/partidos-home/partidos-home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PartidosHomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'new',
        component: PartidoFormComponent,
        pathMatch: 'full'
      },
      /*
      {
        path: 'edit/:id',
        component: PartidoFormComponent
      },
      */
    ]
  }
]


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PartidosRoutingModule { }
