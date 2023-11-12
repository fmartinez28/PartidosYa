import { Injectable } from '@angular/core';
import { IComunidad } from '../interfaces/IComunidad';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunidadesService {

  constructor() { }

  private _comunidades: IComunidad[] = []

  private cachedSearch: IComunidad[] = [];

  getUsuarios(): Observable<IComunidad[]> {
    return of(this._comunidades);
  }

  getUsuario(id: number): Observable<IComunidad> | undefined {
    const comunidad = this._comunidades.find(comunidad => comunidad.id === id);
    if (comunidad) {
      return of(comunidad);
    }
    return undefined;
  } 

  searchUsuarios(term: string): Observable<IComunidad[]> {
    if (!term.trim()) {
      this.cachedSearch = this._comunidades;
    } else {
      const filteredUsuarios = this._comunidades.filter(comunidad => comunidad.nombre.toLowerCase().includes(term.toLowerCase()));
      if (filteredUsuarios.length) {
        this.cachedSearch = filteredUsuarios;
      }
    }
    return of(this.cachedSearch);
  }

}
