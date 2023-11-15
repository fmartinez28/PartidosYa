import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './components/user/user.component';
import { RouterModule } from '@angular/router';
import { MainLayoutPageComponent } from './pages/main-layout-page/main-layout-page.component';
import { BasicUserNavbarComponent } from './components/basic-user-navbar/basic-user-navbar.component';
import { HomeLayoutPageComponent } from './pages/home-layout-page/home-layout-page.component';
import { UsuarioSidebarComponent } from './components/usuario-sidebar/usuario-sidebar.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    UserComponent,
    MainLayoutPageComponent,
    BasicUserNavbarComponent,
    HomeLayoutPageComponent,
    UsuarioSidebarComponent,
    SidebarItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    UserComponent,
    BasicUserNavbarComponent,
    SidebarItemComponent
  ]
})
export class SharedModule { }
