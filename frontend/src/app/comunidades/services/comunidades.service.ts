import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IComunidad } from 'src/interfaces/IComunidad';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/session/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComunidadesService {
  private comunidades: IComunidad[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getComunidades(): Observable<IComunidad[]> {
    const userId = this.getUserId();
    /*const res = this.http.get<IComunidad[]>(`${environment.apiUrl}/comunidades/jugador/${userId}`);*/
    const res = this.http.get<IComunidad[]>(`${environment.apiUrl}/comunidades`);
    res.subscribe(comunidades => this.comunidades = comunidades);
    return res;
  }

  addComunidad(comunidad: IComunidad): Observable<any> {
    const userData = localStorage.getItem('user');
    let token = '';
    if (userData) {
      token = JSON.parse(userData).token;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log("TOKEN", token, "HEADERS", headers)
    return this.http.post(`${environment.apiUrl}/comunidades`, comunidad, { headers: headers });
  }

  joinToComunidad(comunidadId: number): Observable<any> {
    const userId = this.getUserId();
    const userData = localStorage.getItem('user');
    let token = '';
    if (userData) {
      token = JSON.parse(userData).token;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${environment.apiUrl}/comunidades/${comunidadId}/jugador/${userId}`, {}, { headers: headers });
  }

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
}
