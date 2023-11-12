import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../session/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    private titleService: Title,
    private authService: AuthService,
  ) { }

  get title(): string {
    return this.titleService.getTitle();
  }

  get isLoggedIn(): boolean {
    return this.authService.checkIfLoggedIn();
  }

}
