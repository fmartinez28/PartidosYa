import { Injectable } from '@angular/core';
import { IPartido } from '../../../interfaces/IPartido';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminPartidosService {

  constructor(
    private http: HttpClient
  ) { }

  private _partidos: IPartido[] = [];

  private cachedSearch: IPartido[] = [];

  getPartidos(): Observable<IPartido[]> {
    const res = this.http.get<IPartido[]>(`${environment.apiUrl}/partidos`);
    res.subscribe(partidos => this._partidos = partidos);
    return res;
  }

  getPartido(id: number): Observable<IPartido> | undefined {
    return this.http.get<IPartido>(`${environment.apiUrl}/partidos/${id}`);
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

}
