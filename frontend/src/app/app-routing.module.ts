import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutPageComponent } from './shared/pages/main-layout-page/main-layout-page.component';
import { isUserAdmin } from './session/guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'admin', canMatch: [isUserAdmin], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
