import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-comunidades-list-view',
  templateUrl: './comunidades-list-view.component.html',
  styleUrls: ['./comunidades-list-view.component.scss']
})
export class ComunidadesListViewComponent {
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
