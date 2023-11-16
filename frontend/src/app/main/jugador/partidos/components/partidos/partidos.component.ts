import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PartidosService } from '../../services/partidos.service';
import { IPartido } from 'src/interfaces/IPartido';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss']
})
export class PartidosComponent {
  @Input() public partidos!: IPartido[];
  @Input() public partidosState!: boolean;
  constructor(private titleService: Title) {
    this.titleService.setTitle('Partidos');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
<<<<<<< HEAD
=======
  @Input() public city?: string;
  @Input() public country?: string;
  @Input() public userId?: number;
  ngOnInit() {
    (this.city && this.country) ? this.getPartidosByLocation() : this.getPartidosByUser();
  }
  private getPartidosByLocation(){
    this.partidosService.getPartidosByLocation(this.city!, this.country!).subscribe({
      next: (matches) => {
        console.log(matches);
        this.partidos = matches;
      },
      error: (err) => console.warn(err),
      complete: () => console.info("Se completó parece")
    });
  }
  private getPartidosByUser(){
    this.partidosService.getPartidosJoinedByUser().subscribe({
      next: (matches) => {
        console.log(matches);
        this.partidos = matches;
      },
      error: (err) => console.warn(err),
      complete: () => console.info("Se completó parece")
    });
  }
>>>>>>> ad1cbd6 (Muchos, muchos cambios, reestructuración con pages en vez de components, agregada funcionalidad de search, particionado home en Mis Partidos y Buscar Partidos)
}
