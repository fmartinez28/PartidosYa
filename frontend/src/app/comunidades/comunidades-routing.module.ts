import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComunidadesLayoutPageComponent } from './pages/comunidades-layout-page/comunidades-layout-page.component';
import { ComunidadesHomeComponent } from './components/comunidades-home/comunidades-home.component';
import { ComunidadesFormComponent } from './components/comunidades-form/comunidades-form.component';

const routes: Routes = [
  {
    path: '',
    component: ComunidadesLayoutPageComponent,
    children: [
      { path: 'comunidades', component: ComunidadesHomeComponent, pathMatch: 'full' },
      { path: 'comunidades/new', component: ComunidadesFormComponent, pathMatch: 'full' }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComunidadesRoutingModule { }
