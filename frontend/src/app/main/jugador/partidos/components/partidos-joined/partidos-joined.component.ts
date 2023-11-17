import { Component } from '@angular/core';
import { PartidosService } from '../../services/partidos.service';
import { IPartido } from 'src/interfaces/IPartido';

@Component({
  selector: 'app-partidos-joined',
  templateUrl: './partidos-joined.component.html',
  styleUrls: ['./partidos-joined.component.scss']
})
export class PartidosJoinedComponent {
  public partidos!: IPartido[];
  constructor(private partidosService: PartidosService){}
  ngOnInit(){
    this.partidosService.getPartidosJoinedByUser().subscribe({
      next: (matches) => {
        console.log(matches);
        this.partidos = matches;
      },
      error: (err) => console.warn(err),
      complete: () => console.info("Se completó parece")
    });
  }
}
