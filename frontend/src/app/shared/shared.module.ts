import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './components/user/user.component';
import { RouterModule } from '@angular/router';
import { MainLayoutPageComponent } from './pages/main-layout-page/main-layout-page.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    UserComponent,
    MainLayoutPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    UserComponent
  ]
})
export class SharedModule { }
