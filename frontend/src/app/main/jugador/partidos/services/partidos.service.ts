import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, catchError, map, throwError, of} from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPartido } from 'src/interfaces/IPartido';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private httpClient: HttpClient) { }
  public getPartidos(): Observable<IPartido[]> {
      const res = this.httpClient.get<IPartido[]>(`${environment.apiUrl}/partidos`);
      res.subscribe(partidos => this._partidos = partidos);
      return res;
  }

  private _partidos: IPartido[] = [];

  private cachedSearch: IPartido[] = [];

  public addPartido(partido: IPartido): Observable<any> {
    return this.httpClient.post<IPartido>(`${environment.apiUrl}/partidos`, partido, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<IPartido>) => {
          if (res.status != 201) {
            throw new Error(res.statusText);
          }
        }),
        catchError((err) => {
          return throwError(() => new Error(err));
        }
        ));
  }
  public joinPartido(partidoId: number): Observable<any> {
    const localUserInfo: any = localStorage.getItem('user');
    const userId = JSON.parse(localUserInfo).id;
    return this.httpClient.post<any>(`${environment.apiUrl}/partidos/${partidoId}/jugadores`, { partidoid: partidoId, jugadorid: userId }, { observe: 'response' });
  }

  public deletePartido(id: number): Observable<IPartido> {
    return this.httpClient.delete<IPartido>(`${environment.apiUrl}/partidos/${id}`);
  }

  acceptPartido(id: number): Observable<IPartido> {
    return this.httpClient.put<IPartido>(`${environment.apiUrl}/partidos/${id}/accept`, {});
  }

  searchPartido(term: string): Observable<IPartido[]> {
      if (!term.trim()) {
          this.cachedSearch = this._partidos;
      } else {
          const filteredPartidos = this._partidos.filter((partido => partido.fechacreacion.toLowerCase().includes(term.toLowerCase())) || (partido => partido.fechaprogramada.toLowerCase().includes(term.toLowerCase())) || (partido => partido.id!.toString().includes(term.toLowerCase())));
          if (filteredPartidos.length) {
              this.cachedSearch = filteredPartidos;
          }
      }
      return of(this.cachedSearch);
  }
}
