import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunidadesHomeComponent } from './components/comunidades-home/comunidades-home.component';
import { ComunidadesListComponent } from './components/comunidades-list/comunidades-list.component';
import { ComunidadesListItemComponent } from './components/comunidades-list/comunidades-list-item/comunidades-list-item.component';
import { ComunidadesLayoutPageComponent } from './pages/comunidades-layout-page/comunidades-layout-page.component';
import { ComunidadesListViewComponent } from './pages/comunidades-list-view/comunidades-list-view.component';
import { ComunidadesFormComponent } from './components/comunidades-form/comunidades-form.component';
import { ComunidadesFormViewComponent } from './pages/comunidades-form-view/comunidades-form-view.component';
import { SharedModule } from '../shared/shared.module';
import { ComunidadesRoutingModule } from './comunidades-routing.module';



@NgModule({
  declarations: [
    ComunidadesLayoutPageComponent,
    ComunidadesHomeComponent,
    ComunidadesListComponent,
    ComunidadesListItemComponent,
    ComunidadesListViewComponent,
    ComunidadesFormComponent,
    ComunidadesFormViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComunidadesRoutingModule
  ]
})
export class ComunidadesModule { }
