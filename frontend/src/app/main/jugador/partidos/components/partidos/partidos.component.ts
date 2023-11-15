import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PartidosService } from '../../services/partidos.service';
import { IPartido } from 'src/interfaces/IPartido';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss']
})
export class PartidosComponent {
  public partidos?: IPartido[];
  constructor(private titleService: Title, private partidosService: PartidosService) {
    this.titleService.setTitle('Partidos');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
  ngOnInit() {
    this.partidosService.getPartidos().subscribe({
      next: (matches) => {
        console.log(matches);
        this.partidos = matches;
      },
      error: (err) => console.warn(err),
      complete: () => console.info("Se completó parece")
    })
  }
}
