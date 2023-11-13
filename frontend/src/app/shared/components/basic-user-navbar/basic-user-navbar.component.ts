import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-user-navbar',
  templateUrl: './basic-user-navbar.component.html',
  styleUrls: ['./basic-user-navbar.component.scss']
})
export class BasicUserNavbarComponent {
  constructor(
    public router: Router
  ) { }
}
