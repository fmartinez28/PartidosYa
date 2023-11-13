import { Injectable } from '@angular/core';
import { IComunidad } from '../../../interfaces/IComunidad';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunidadesService {

  constructor() { }

  private cachedSearch: IComunidad[] = [];

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

  searchComunidad(term: string): Observable<IComunidad[]> {
    if (!term.trim()) {
      this.cachedSearch = this._comunidades;
    } else {
      const filteredComunidades = this._comunidades.filter(comunidad => comunidad.nombre.toLowerCase().includes(term.toLowerCase()));
      if (filteredComunidades.length) {
        this.cachedSearch = filteredComunidades;
      }
    }
    return of(this.cachedSearch);
  }

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

}
