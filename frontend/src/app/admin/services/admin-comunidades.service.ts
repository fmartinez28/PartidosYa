import { Injectable } from '@angular/core';
import { IComunidad } from '../../../interfaces/IComunidad';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminComunidadesService {

  constructor(
    private http: HttpClient
  ) { }

  private _comunidades: IComunidad[] = [];

  private cachedSearch: IComunidad[] = [];

  getComunidades(): Observable<IComunidad[]> {
    const res = this.http.get<IComunidad[]>(`${environment.apiUrl}/comunidades`);
    res.subscribe(comunidades => this._comunidades = comunidades);
    return res;
  }

  getComunidad(id: number): Observable<IComunidad> | undefined {
    return this.http.get<IComunidad>(`${environment.apiUrl}/comunidades/${id}`);
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

}
