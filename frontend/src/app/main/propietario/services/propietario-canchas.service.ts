import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/session/services/auth.service';
import { environment } from 'src/environments/environment';
import { ICancha } from 'src/interfaces/ICancha';

@Injectable({
  providedIn: 'root'
})
export class PropietarioCanchasService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private _canchas: ICancha[] = []

  private cachedSearch: ICancha[] = [];

  getCanchas(): Observable<ICancha[]> {
    const user = this.authService.getUser();
    if(user){
      const id = JSON.parse(user).id;
      const res = this.http.get<ICancha[]>(`${environment.apiUrl}/propietarios/${id}/canchas`);
      res.subscribe(canchas => this._canchas = canchas);
      return res;
    }
    return of([])
  }

  getCancha(id: number): Observable<ICancha> | undefined {
    return this.http.get<ICancha>(`${environment.apiUrl}/canchas/${id}`);
  }

  deleteCancha(id: number): Observable<ICancha> {
    return this.http.delete<ICancha>(`${environment.apiUrl}/canchas/${id}`);
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
}
