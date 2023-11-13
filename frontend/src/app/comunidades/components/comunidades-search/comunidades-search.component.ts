import { Component } from '@angular/core';
import { ComunidadesService } from '../../services/comunidades.service';
import { IComunidad } from 'src/interfaces/IComunidad';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comunidades-search',
  templateUrl: './comunidades-search.component.html',
  styleUrls: ['./comunidades-search.component.scss']
})
export class ComunidadesSearchComponent {
  comunidades: IComunidad[] = [];

  constructor(
    private comunidadesService: ComunidadesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getComunidades();
  }

  getComunidades(): void {
    this.comunidadesService.getComunidades().subscribe(comunidades => this.comunidades = comunidades);
    this.router.navigate(['/comunidades']);
  }
}
