import { Component } from '@angular/core';
import { PartidosService } from '../../services/partidos.service';
import { IPartido } from 'src/interfaces/IPartido';

@Component({
  selector: 'app-partidos-search',
  templateUrl: './partidos-search.component.html',
  styleUrls: ['./partidos-search.component.scss']
})
export class PartidosSearchComponent {
  public partidos?: IPartido[];
  public city: string = '';
  public country: string = '';
  constructor(private partidosService: PartidosService) { }

  public getAllPartidos(){
    this.partidosService.getPartidos().subscribe({
      next: (partidos) => {
        console.log(partidos);
        this.partidos = partidos;
      },
      error: (err) => console.warn(err),
      complete: () => console.info("Se completó parece")
    });
  }

  public getPartidosByLocation(){
    console.log(this.city, this.country);
    if (!this.city || !this.country) {
      return;
    }
    this.partidosService.getPartidosByLocation(this.city, this.country, true, true).subscribe({
      next: (matches) => {
        console.log(matches);
        this.partidos = matches;
      },
      error: (err) => console.warn(err),
      complete: () => console.info("Se completó parece")
    });
  }
}
