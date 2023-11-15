import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPartido } from 'src/interfaces/IPartido';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private httpClient: HttpClient) { }
  public getPartidos(): Observable<IPartido[]> {
    return this.httpClient.get<IPartido[]>(`${environment.apiUrl}/partidos`, {
      //headers: {"Authorization": "Bearer el token"},
    });
  }
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
}
