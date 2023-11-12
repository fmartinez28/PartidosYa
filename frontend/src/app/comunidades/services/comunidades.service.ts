import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IComunidad } from 'src/app/admin/interfaces/IComunidad';

@Injectable({
  providedIn: 'root'
})
export class ComunidadesService {

  constructor() { }

  private _comunidades: IComunidad[] =
    [
      {
        id: 1,
        nombre: 'Comunidad 1'
      },
      {
        id: 2,
        nombre: 'Comunidad 2'
      },
      {
        id: 3,
        nombre: 'Comunidad 3'
      }
    ];

  getComunidades(): Observable<IComunidad[]> {
    return of(this._comunidades);
  }

  getComunidad(id: number): Observable<IComunidad> | undefined {
    const comunidad = this._comunidades.find(comunidad => comunidad.id === id);
    if (comunidad) {
      return of(comunidad);
    }
    return undefined;
  }

}
