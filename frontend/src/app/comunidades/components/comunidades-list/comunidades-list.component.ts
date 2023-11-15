import { Component, Input, inject } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor() { }

  ngOnInit(): void {
    this.getComunidades();
  }

  getComunidades(): void {
    this.comunidadesService.getComunidades().subscribe(
      comunidades => this.comunidades = comunidades
    );
  }
}