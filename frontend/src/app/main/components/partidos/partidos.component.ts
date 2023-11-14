import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss']
})
export class PartidosComponent {

  constructor(private titleService: Title){
    this.titleService.setTitle('Partidos');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
