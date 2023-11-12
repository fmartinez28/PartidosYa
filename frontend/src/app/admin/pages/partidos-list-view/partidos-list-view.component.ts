import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-partidos-list-view',
  templateUrl: './partidos-list-view.component.html',
  styleUrls: ['./partidos-list-view.component.scss']
})
export class PartidosListViewComponent {
  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Partidos");
  }

  get title () {
    return this.titleService.getTitle();
  }
}
