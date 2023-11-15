import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-comunidades-form-view',
  templateUrl: './comunidades-form-view.component.html',
  styleUrls: ['./comunidades-form-view.component.scss']
})
export class ComunidadesFormViewComponent {
  constructor(
    private componentTitle: Title
  ) { }

  ngOnInit(): void {
    this.componentTitle.setTitle("Tus comunidades");
  }

  get title() {
    return this.componentTitle.getTitle();
  }
}
