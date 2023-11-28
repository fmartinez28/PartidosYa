import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, catchError, map, throwError, of, tap} from 'rxjs';
import { AuthService } from 'src/app/session/services/auth.service';
import { environment } from 'src/environments/environment';
import { IPartido } from 'src/interfaces/IPartido';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {
  //Estos 2 métodos podrían simplemente existir en un shared service UserService para reutilizarlo
  private getUserId(): number {
    let user = this.authService.getUser();
    if (user) {
      try {
        const userObj = JSON.parse(user);
        if ('id' in userObj) {
          return userObj.id;
        }
      } catch (e) {
        console.error('Error al obtener el id del usuario', e);
      }
    }
    return -1;
  }
  private getUserToken(): string {
    const userData = localStorage.getItem('user');

    let token = '';
    if (userData) {
      token = JSON.parse(userData).token;
    }
    return token;
  }
  constructor(private httpClient: HttpClient, private authService: AuthService) { }
  public getPartidos(): Observable<IPartido[]> {
      const res = this.httpClient.get<IPartido[]>(`${environment.apiUrl}/partidos`);
      res.subscribe(partidos => this._partidos = partidos);
      return res;
  }


  private _partidos: IPartido[] = [];

  private cachedSearch: IPartido[] = [];

  public getPartido(id: number): Observable<IPartido> {
    return this.httpClient.get<IPartido>(`${environment.apiUrl}/partidos/${id}`, {
      //headers: {"Authorization": "Bearer el token"},
    });
  }
  public getPartidosByLocation(city: string, country: string, filterUser?: boolean, aprobado?: boolean): Observable<IPartido[]> {
    let endpoint = `${environment.apiUrl}/partidos?city=${city.trim()}&country=${country.trim()}`;
    endpoint = filterUser ? `${endpoint}&without=${this.getUserId()}` : endpoint;
    endpoint = aprobado ? `${endpoint}&aprobado=${aprobado}` : endpoint;
    return this.httpClient.get<IPartido[]>(endpoint, {
      //headers: {"Authorization": "Bearer el token"},
    });
  }
  public getPartidosJoinedByUser(): Observable<IPartido[]> {
    return this.httpClient.get<IPartido[]>(`${environment.apiUrl}/partidos?with=${this.getUserId()}`, {
      //headers: {"Authorization": "Bearer el token"},
    });
  }

  public addPartido(partido: IPartido): Observable<any> {
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<IPartido>(`${environment.apiUrl}/partidos`, partido, { headers: headers, observe: 'response'},)
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
  public leavePartido(partidoId: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/partidos/${partidoId}/jugadores/${this.getUserId()}`, { observe: 'response' })
    .pipe(
      map((res: HttpResponse<any>) => {
        if (res.status != 204) {
          throw new Error(res.statusText);
        }
      }),
    catchError((err) => {
      return throwError(() => new Error(err));
    })
    );
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
  public editPartido(partido: IPartido){
    return this.httpClient.put<IPartido>(`${environment.apiUrl}/partidos/${partido.id}`, partido, { observe: 'response'}).pipe(
      tap((res: HttpResponse<IPartido>) => {
        if (res.status != 200) throw new Error("Error al editar partido.");
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }
  public cancelPartido(id: number){
    return this.httpClient.delete<IPartido>(`${environment.apiUrl}/partidos/${id}`, { observe: 'response'}).pipe(
      tap((res: HttpResponse<IPartido>) => {
        if (res.status != 204) throw new Error("Error al cancelar partido.");
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }
}
