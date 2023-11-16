import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ComunidadesHomeComponent } from './components/comunidades-home/comunidades-home.component';
import { ComunidadesListComponent } from './components/comunidades-list/comunidades-list.component';
import { ComunidadesListViewComponent } from './pages/comunidades-list-view/comunidades-list-view.component';
import { ComunidadesFormComponent } from './components/comunidades-form/comunidades-form.component';
import { ComunidadesFormViewComponent } from './pages/comunidades-form-view/comunidades-form-view.component';
import { ComunidadesRoutingModule } from './comunidades-routing.module';
import { ComunidadesSearchComponent } from './components/comunidades-search/comunidades-search.component';
import { ComunidadesHomeViewComponent } from './pages/comunidades-home-view/comunidades-home-view.component';
import { ComunidadesSearchViewComponent } from './pages/comunidades-search-view/comunidades-search-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComunidadesListItemComponent } from './components/comunidades-list/comunidades-list-item/comunidades-list-item.component';
import { ComunidadesUsuarioListItemComponent } from './components/comunidades-usuarios-list/comunidades-usuario-list-item/comunidades-usuario-list-item.component';
import { ComunidadesUsuariosListComponent } from './components/comunidades-usuarios-list/comunidades-usuarios-list.component';



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
    ComunidadesSearchViewComponent,

    ComunidadesUsuarioListItemComponent,
    ComunidadesUsuariosListComponent
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
