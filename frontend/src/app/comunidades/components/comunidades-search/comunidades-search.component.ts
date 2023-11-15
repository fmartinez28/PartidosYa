import { Component, inject } from '@angular/core';
import { ComunidadesService } from '../../services/comunidades.service';
import { IComunidad } from 'src/interfaces/IComunidad';

@Component({
  selector: 'app-comunidades-search',
  templateUrl: './comunidades-search.component.html',
  styleUrls: ['./comunidades-search.component.scss']
})
export class ComunidadesSearchComponent {
  comunidades: IComunidad[] = [];

  private comunidadesService: ComunidadesService = inject(ComunidadesService);

  constructor() { }

  ngOnInit(): void {
    this.getComunidades();
  }

  getComunidades(): void {
    this.comunidadesService.getComunidades().subscribe({
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
