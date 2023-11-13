import { Component } from '@angular/core';
<<<<<<< HEAD
import { Title } from '@angular/platform-browser';
=======
>>>>>>> c74da364edfc8ba97bb85d8d18e752b4459ebecc

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss']
})
export class PartidosComponent {
<<<<<<< HEAD
  constructor(private titleService: Title){
    this.titleService.setTitle('Partidos');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
=======

>>>>>>> c74da364edfc8ba97bb85d8d18e752b4459ebecc
}
