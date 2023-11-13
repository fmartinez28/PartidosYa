import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IComunidad } from 'src/interfaces/IComunidad';
import { AuthService } from 'src/app/session/services/auth.service';
import { ComunidadesService } from '../../services/comunidades.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-comunidades-home',
  templateUrl: './comunidades-home.component.html',
  styleUrls: ['./comunidades-home.component.scss']
})
export class ComunidadesHomeComponent {
  private comunidades!: Observable<IComunidad[]> | null;
  public tieneComunidades: boolean = false;

  constructor(
    private componentTitle: Title,
    private authService: AuthService,
    private comunidadesService: ComunidadesService
  ) {
  }

  ngOnInit(): void {
    this.componentTitle.setTitle("Tus comunidades");
  }

  get title() {
    return this.componentTitle.getTitle();
  }

  public getUserId(): number {
    let user = this.authService.getUser();
    if (user) {
      try {
        const userObj = JSON.parse(user);
        if ('id' in userObj) {
          return userObj.id;
        }
      } catch (e) {
        console.error('Error al obtener el id del usuario', e);
      }
    }
    return -1;
  }

  public fetchComunidades(): void {
    const userId = this.getUserId();
    if (userId > 0) {
      console.log("Hay usuario es:", userId)
      if (this.comunidadesService.getComunidades(userId)) {
        console.log("COMUNIDADES", this.comunidadesService.getComunidades(userId));
        this.comunidades = this.comunidadesService.getComunidades(userId);
        this.tieneComunidades = true;
      }
      else {
        console.log("No hay usuario")
        this.comunidades = null;
      }
    } else {
      this.comunidades = null;
    }
  }

  public getComunidades(): Observable<IComunidad[]> | null {
    const comunidadesHardcodeadas: IComunidad[] = [
      {
        id: 1,
        nombre: 'Comunidad de Programadores',
        descripcion: 'Una comunidad para entusiastas de la programación',
        cantidadMiembros: 10,
        maximoMiembros: 50
      },
      {
        id: 2,
        nombre: 'Club de Ajedrez',
        descripcion: 'Comunidad para jugadores de ajedrez de todos los niveles',
        cantidadMiembros: 10,
        maximoMiembros: 10
      },
      {
        id: 3,
        nombre: 'Grupo de Lectura',
        cantidadMiembros: 10,
        maximoMiembros: 30
      }
    ];
    return of(comunidadesHardcodeadas);
  }
}
