import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutPageComponent } from '../shared/pages/main-layout-page/main-layout-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutPageComponent,
    loadChildren: () => import('../session/session.module').then(m => m.SessionModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
