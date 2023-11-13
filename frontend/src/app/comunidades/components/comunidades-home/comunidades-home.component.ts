import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-comunidades-home',
  templateUrl: './comunidades-home.component.html',
  styleUrls: ['./comunidades-home.component.scss']
})
export class ComunidadesHomeComponent {

  constructor(
    private componentTitle: Title
  ) {
  }

  ngOnInit(): void {
    this.componentTitle.setTitle("Tus comunidades");
  }

  get title() {
    return this.componentTitle.getTitle();
  }
}
