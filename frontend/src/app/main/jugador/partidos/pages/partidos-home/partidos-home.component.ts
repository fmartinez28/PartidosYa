import { Component } from '@angular/core';

@Component({
  selector: 'app-partidos-home',
  templateUrl: './partidos-home.component.html',
  styleUrls: ['./partidos-home.component.scss']
})
export class PartidosHomeComponent {
  isMisPartidosSelected: boolean = false;

  toggleSelection(selected: string): void {
    this.isMisPartidosSelected = selected === 'misPartidos';
  }
}
