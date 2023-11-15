import { Injectable, inject } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { IComunidad } from 'src/interfaces/IComunidad';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/session/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComunidadesService {
  private comunidades: IComunidad[] = [];
  private cachedSearch: IComunidad[] | null = [];
  private comunidadAgregadaSource = new Subject<void>();
  comunidadAgregada = this.comunidadAgregadaSource.asObservable();

  private http: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  constructor() { }

  notificarComunidadAgregada(): void {
    this.comunidadAgregadaSource.next();
  }

  getComunidades(): Observable<IComunidad[]> {
    const userId = this.getUserId();
    const res = this.http.get<IComunidad[]>(`${environment.apiUrl}/comunidades?filter=${userId}`);
    res.subscribe({
      next: comunidades => {
        this.comunidades = comunidades;
      },
      error: err => {
        console.error(err);
      }
    });
    return res;
  }

  getComunidadesByUserID(): Observable<IComunidad[]> {
    const userId = this.getUserId();
    const res = this.http.get<IComunidad[]>(`${environment.apiUrl}/comunidades/jugador/${userId}`);
    res.subscribe({
      next: comunidades => {
        this.comunidades = comunidades;
      },
      error: err => {
        console.error(err);
      }
    });
    return res;
  }

  addComunidad(comunidad: IComunidad): Observable<any> {
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${environment.apiUrl}/comunidades`, comunidad, { headers: headers });
  }

  joinToComunidad(comunidadId: number): Observable<any> {
    const userId = this.getUserId();
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const postPayload = {
      jugadorid: userId,
      fecharegistro: this.getCurrentDateFormatted()
    }

    return this.http.post(`${environment.apiUrl}/comunidades/${comunidadId}/jugadores`, postPayload, { headers: headers });
  }

  joinToComunidadAsModerador(comunidadId: number): Observable<any> {
    const userId = this.getUserId();
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const postPayload = {
      jugadorid: userId
    }

    return this.http.post(`${environment.apiUrl}/comunidades/${comunidadId}/moderador`, postPayload, { headers: headers })
  }

  searchComunidad(filter: string): Observable<IComunidad[] | null> {
    if (!filter.trim()) {
      this.cachedSearch = this.comunidades;
    } else {
      console.log("antes del filter", this.comunidades)
      const filteredComunidades = this.comunidades.filter(comunidad => comunidad.nombre.toLowerCase().includes(filter.toLowerCase()));
      if (filteredComunidades.length) {
        this.cachedSearch = filteredComunidades;
      } else {
        this.cachedSearch = null;
      }
    }
    return of(this.cachedSearch);
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
