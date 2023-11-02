import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutPageComponent } from './shared/pages/main-layout-page/main-layout-page.component';

const routes: Routes = [
  { component: MainLayoutPageComponent, path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
