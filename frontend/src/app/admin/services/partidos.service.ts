import { Injectable } from '@angular/core';
import { IPartido } from '../interfaces/IPartido';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor() { }

  private cachedSearch: IPartido[] = [];

  getPartidos(): Observable<IPartido[]> {
    return of(this._partidos);
  }

  getPartido(id: number): Observable<IPartido> | undefined {
    const partido = this._partidos.find(partido => partido.id === id);
    if (partido) {
      return of(partido);
    }
    return undefined;
  } 

  searchPartido(term: string): Observable<IPartido[]> {
    if (!term.trim()) {
      this.cachedSearch = this._partidos;
    } else {
      const filteredPartidos = this._partidos.filter((partido => partido.fechaCreacion.toLowerCase().includes(term.toLowerCase())) || (partido => partido.fechaProgramada.toLowerCase().includes(term.toLowerCase())) || (partido => partido.id.toString().includes(term.toLowerCase())));
      if (filteredPartidos.length) {
        this.cachedSearch = filteredPartidos;
      }
    }
    return of(this.cachedSearch);
  }

  private _partidos: IPartido[] =
  [
    {
      id: 1,
      canchaId: 1,
      comunidadId: 1,
      fechaCreacion: '01/01/2020',
      fechaProgramada: '01/01/2020'
    },
    {
      id: 2,
      canchaId: 2,
      comunidadId: 2,
      fechaCreacion: '01/01/2020',
      fechaProgramada: '01/01/2020'
    },
    {
      id: 3,
      canchaId: 3,
      comunidadId: 3,
      fechaCreacion: '01/01/2020',
      fechaProgramada: '01/01/2020'
    }
      
  ]
}
