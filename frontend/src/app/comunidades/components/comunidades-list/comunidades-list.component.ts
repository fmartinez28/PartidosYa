import { Component, inject } from '@angular/core';
import { IComunidad } from 'src/interfaces/IComunidad';
import { ComunidadesService } from '../../services/comunidades.service';

@Component({
  selector: 'app-comunidades-list',
  templateUrl: './comunidades-list.component.html',
  styleUrls: ['./comunidades-list.component.scss']
})
export class ComunidadesListComponent {
  comunidades: IComunidad[] = [];

  private comunidadesService: ComunidadesService = inject(ComunidadesService);

  constructor() {
    this.comunidadesService.comunidadAgregada.subscribe(() => {
      this.getComunidades();
    });
  }

  ngOnInit(): void {
    this.getComunidades();
  }

  getComunidades(): void {
    this.comunidadesService.getComunidadesByUserID().subscribe({
      next: comunidades => {
        this.comunidades = comunidades;
      },
      complete: () => {
        console.log({ result: 'OK' })
      },
      error: err => {
        console.error(err);
      }
    });
  }
}