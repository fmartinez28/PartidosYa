import { Component } from '@angular/core';
import { IComunidad } from 'src/app/admin/interfaces/IComunidad';
import { ComunidadesService } from '../../services/comunidades.service';

@Component({
  selector: 'app-comunidades-list',
  templateUrl: './comunidades-list.component.html',
  styleUrls: ['./comunidades-list.component.scss']
})
export class ComunidadesListComponent {
  comunidades: IComunidad[] = [];

  constructor(
    private comunidadesService: ComunidadesService
  ) { }

  ngOnInit(): void {
    this.getComunidades();
  }

  getComunidades(): void {
    this.comunidadesService.getComunidades().subscribe(comunidades => this.comunidades = comunidades);
  }
}