import {Component, HostListener} from '@angular/core';
import {AuthService} from "../../../session/services/auth.service";

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {
  public isSidebarHidden: boolean = false;

  public toggleSidebar() {
    console.log("toggleSidebar");
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
