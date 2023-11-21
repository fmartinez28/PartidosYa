import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/session/services/auth.service';

@Component({
  selector: 'app-usuario-sidebar',
  templateUrl: './usuario-sidebar.component.html',
  styleUrls: ['./usuario-sidebar.component.scss']
})
export class UsuarioSidebarComponent {

  constructor(
    private authService: AuthService
  ){}

  getUserRole(): number {
    return this.authService.getUserRole();
  }
  public isSidebarHidden: boolean = false;

  public toggleSidebar() {
  this.isSidebarHidden = !this.isSidebarHidden;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isSidebarHidden = window.innerWidth <= 640;
  }
}
