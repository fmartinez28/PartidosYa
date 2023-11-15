import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comunidades-home',
  templateUrl: './comunidades-home.component.html',
  styleUrls: ['./comunidades-home.component.scss']
})
export class ComunidadesHomeComponent {

  routerLink: string = "/player/comunidades/"

  constructor(
    private componentTitle: Title,
    private router: Router) {
  }

  ngOnInit(): void {
    this.componentTitle.setTitle("Comunidades");
  }

  get title() {
    return this.componentTitle.getTitle();
  }

  getRouter() {
    return this.router;
  }
}
