import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComunitiesPageComponent } from './pages/comunities-page/comunities-page.component';
import { ComunitiesListComponent } from './components/comunitieslist/comunitieslist.component';

const routes: Routes = [
  {
    path: '',
    component: ComunitiesPageComponent,
    children: [
      { path: 'comunities', component: ComunitiesListComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComunitiesRoutingModule { }
