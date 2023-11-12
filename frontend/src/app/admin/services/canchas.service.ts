import { Injectable } from '@angular/core';
import { ICancha } from '../interfaces/ICancha';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanchasService {

  constructor() { }

  private cachedSearch: ICancha[] = [];

  getCanchas(): Observable<ICancha[]> {
    return of(this._canchas);
  }

  getCancha(id: number): Observable<ICancha> | undefined {
    const cancha = this._canchas.find(cancha => cancha.id === id);
    if (cancha) {
      return of(cancha);
    }
    return undefined;
  }

  searchCanchas(term: string): Observable<ICancha[]> {
    if (!term.trim()) {
      this.cachedSearch = this._canchas;
    } else {
      const filteredCanchas = this._canchas.filter(cancha => cancha.nombre.toLowerCase().includes(term.toLowerCase()));
      if (filteredCanchas.length) {
        this.cachedSearch = filteredCanchas;
      }
    }
    return of(this.cachedSearch);
  }

  private _canchas: ICancha[] =
  [
    {
      id: 1,
      nombre: 'Cancha 1',
      propietarioId: 1,
      direccionId: 1,
      canchaNum: 1
    },
    {
      id: 2,
      nombre: 'Cancha 2',
      propietarioId: 2,
      direccionId: 2,
      canchaNum: 2
    },
    {
      id: 3,
      nombre: 'Cancha 3',
      propietarioId: 3,
      direccionId: 3,
      canchaNum: 3
    },
  ]

}
