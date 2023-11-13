import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComunidadesHomeComponent } from './components/comunidades-home/comunidades-home.component';
import { ComunidadesFormComponent } from './components/comunidades-form/comunidades-form.component';
import { ComunidadesSearchComponent } from './components/comunidades-search/comunidades-search.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ComunidadesHomeComponent, pathMatch: 'full' },
      { path: 'new', component: ComunidadesFormComponent, pathMatch: 'full' },
      { path: 'search', component: ComunidadesSearchComponent, pathMatch: 'full' }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComunidadesRoutingModule { }
