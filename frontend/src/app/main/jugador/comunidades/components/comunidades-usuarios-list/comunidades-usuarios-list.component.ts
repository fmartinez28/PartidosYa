import { Component, Input, inject } from '@angular/core';
import { ComunidadesService } from '../../services/comunidades.service';
import { IComunidadUser } from 'src/interfaces/IComunidadUser';
import { IComunidad } from 'src/interfaces/IComunidad';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comunidades-usuarios-list',
  templateUrl: './comunidades-usuarios-list.component.html',
  styleUrls: ['./comunidades-usuarios-list.component.scss']
})
export class ComunidadesUsuariosListComponent {
  @Input()
  comunidad!: IComunidad;
  usuarios: IComunidadUser[] | null = [];

  private comunidadesService: ComunidadesService = inject(ComunidadesService);
  public router: Router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    this.getUsers();
  }

  toggleModal() {
    this.comunidadesService.showModal = !this.comunidadesService.showModal;
  }

  getUsers(): void {
    this.comunidadesService.getComunidadUsers(this.comunidad.id).subscribe({
      next: usuarios => {
        this.usuarios = usuarios;
      },
      complete: () => {
        console.log({ result: 'OK' })
      },
      error: err => {
        console.error(err);
      }
    });
  }

  getComunidadesService() {
    return this.comunidadesService;
  }
}
