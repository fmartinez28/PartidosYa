import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IComunidad } from 'src/interfaces/IComunidad';
import { ComunidadesService } from '../../../services/comunidades.service';
import { showAlert } from 'src/utils/utils';

@Component({
  selector: 'app-comunidades-list-item',
  templateUrl: './comunidades-list-item.component.html',
  styleUrls: ['./comunidades-list-item.component.scss']
})
export class ComunidadesListItemComponent implements OnInit {
  @Input()
  public comunidad!: IComunidad;

  @Input()
  public joinComunidad!: boolean;

  comunidadSeleccionada!: IComunidad | null;

  private routerLink: string = "/player/comunidades";
  private comunidadesService: ComunidadesService = inject(ComunidadesService);
  private router: Router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    if (!this.comunidad) throw new Error('Comunidad is required');
  }

  openModal(comunidad: IComunidad) {
    this.comunidadSeleccionada = comunidad;
    this.comunidadesService.showModal = true;
  }

  joinToComunidad(): void {
    this.comunidadesService.joinToComunidad(this.comunidad.id).subscribe({
      next: res => {
        console.log({ comunidades: res });
      },
      complete: () => {
        showAlert('success', 'Usted se ha unido correctamente a la comunidad!');
        this.router.navigate([this.routerLink]);
      },
      error: err => {
        showAlert('danger', 'Ocurrió un error al unirse a la comunidad, intente nuevamente');
        console.log({ error: err })
        this.router.navigate([this.routerLink]);
      }
    });
  }
}
