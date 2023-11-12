import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './components/user/user.component';
import { RouterModule } from '@angular/router';
import { MainLayoutPageComponent } from './pages/main-layout-page/main-layout-page.component';
import { BasicUserNavbarComponent } from './components/basic-user-navbar/basic-user-navbar.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    UserComponent,
    MainLayoutPageComponent,
    BasicUserNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    UserComponent,
    BasicUserNavbarComponent
  ]
})
export class SharedModule { }
