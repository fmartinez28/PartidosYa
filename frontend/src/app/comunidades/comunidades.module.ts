import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ComunidadesHomeComponent } from './components/comunidades-home/comunidades-home.component';
import { ComunidadesListComponent } from './components/comunidades-list/comunidades-list.component';
import { ComunidadesListItemComponent } from './components/comunidades-list/comunidades-list-item/comunidades-list-item.component';
import { ComunidadesListViewComponent } from './pages/comunidades-list-view/comunidades-list-view.component';
import { ComunidadesFormComponent } from './components/comunidades-form/comunidades-form.component';
import { ComunidadesFormViewComponent } from './pages/comunidades-form-view/comunidades-form-view.component';
import { ComunidadesRoutingModule } from './comunidades-routing.module';
import { ComunidadesSearchComponent } from './components/comunidades-search/comunidades-search.component';
import { ComunidadesHomeViewComponent } from './pages/comunidades-home-view/comunidades-home-view.component';
import { ComunidadesSearchViewComponent } from './pages/comunidades-search-view/comunidades-search-view.component';



@NgModule({
  declarations: [
    ComunidadesHomeComponent,
    ComunidadesHomeViewComponent,

    ComunidadesListComponent,
    ComunidadesListItemComponent,
    ComunidadesListViewComponent,

    ComunidadesFormComponent,
    ComunidadesFormViewComponent,

    ComunidadesSearchComponent,
    ComunidadesSearchViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComunidadesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComunidadesModule { }
