import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PartidosComponent } from './components/partidos/partidos.component';
import { PartidoFormComponent } from './components/partido-form/partido-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PartidosComponent,
        pathMatch: 'full'
      },
      {
        path: 'new',
        component: PartidoFormComponent,
        pathMatch: 'full'
      }
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
