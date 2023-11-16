import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
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
    return this.httpClient.get<IPartido[]>(`${environment.apiUrl}/partidos`, {
      //headers: {"Authorization": "Bearer el token"},
    });
  }
  public getPartidosByLocation(city: string, country: string): Observable<IPartido[]> {
    return this.httpClient.get<IPartido[]>(`${environment.apiUrl}/partidos?city=${city.trim()}&country=${country.trim()}`, {
      //headers: {"Authorization": "Bearer el token"},
    });
  }
  public getPartidosJoinedByUser(): Observable<IPartido[]> {
    return this.httpClient.get<IPartido[]>(`${environment.apiUrl}/partidos?joinedBy=${this.getUserId()}`, {
      //headers: {"Authorization": "Bearer el token"},
    });
  }

  public addPartido(partido: IPartido): Observable<any> {
    const userId = this.getUserId();
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
  public joinPartido(partidoId: number): Observable<any> {
    const localUserInfo: any = localStorage.getItem('user');
    const userId = JSON.parse(localUserInfo).id;
    return this.httpClient.post<any>(`${environment.apiUrl}/partidos/${partidoId}/jugadores`, { partidoid: partidoId, jugadorid: userId }, { observe: 'response' });
  }
}
