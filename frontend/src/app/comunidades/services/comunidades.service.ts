import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IComunidad } from 'src/interfaces/IComunidad';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/session/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ComunidadesService {
  private comunidades: IComunidad[] = [];

  private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  constructor() { }

  getComunidades(): Observable<IComunidad[]> {
    const res = this.http.get<IComunidad[]>(`${environment.apiUrl}/comunidades`);
    res.subscribe(comunidades => this.comunidades = comunidades);
    this.router.navigate(['/comunidades']);
    return res;
  }

  getComunidadesByUserID(): Observable<IComunidad[]> {
    const userId = this.getUserId();
    const res = this.http.get<IComunidad[]>(`${environment.apiUrl}/comunidades/jugador/${userId}`);
    res.subscribe(comunidades => this.comunidades = comunidades);
    return res;
  }

  addComunidad(comunidad: IComunidad): Observable<any> {
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${environment.apiUrl}/comunidades`, comunidad, { headers: headers });
  }

  joinToComunidad(comunidadId: number): void {
    const userId = this.getUserId();
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const postPayload = {
      jugadorid: userId,
      fecharegistro: this.getCurrentDateFormatted()
    }

    this.http.post(`${environment.apiUrl}/comunidades/${comunidadId}/jugadores`, postPayload, { headers: headers }).subscribe({
      next: res => {
        console.log({ comunidades: res });
      },
      complete: () => {
        console.log({ result: "OK" })
      },
      error: err => {
        this.router.navigate(['/comunidades']);
        console.log({ error: err })
      }
    });
    this.router.navigate(['/comunidades']);
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

  private getUserToken(): string {
    const userData = localStorage.getItem('user');

    let token = '';
    if (userData) {
      token = JSON.parse(userData).token;
    }
    return token;
  }

  private getCurrentDateFormatted() {
    const date = new Date();

    let year = date.getFullYear().toString().substr(-2);
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    month = month.length < 2 ? '0' + month : month;
    day = day.length < 2 ? '0' + day : day;

    return `${year}-${month}-${day}`;
  }
}
