import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-comunidades-list-view',
  templateUrl: './comunidades-list-view.component.html',
  styleUrls: ['./comunidades-list-view.component.scss']
})
export class ComunidadesListViewComponent {
  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Comunidades");
  }

  get title () {
    return this.titleService.getTitle();
  }
}
