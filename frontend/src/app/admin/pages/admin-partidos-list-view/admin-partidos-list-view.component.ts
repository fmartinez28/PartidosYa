import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-partidos-list-view',
  templateUrl: './admin-partidos-list-view.component.html',
  styleUrls: ['./admin-partidos-list-view.component.scss']
})
export class AdminPartidosListViewComponent {
  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Partidos");
  }

  get title() {
    return this.titleService.getTitle();
  }
}
