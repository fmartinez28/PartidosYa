import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IComunidad } from 'src/interfaces/IComunidad';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComunidadesService {

  constructor(private http: HttpClient) { }

  getComunidades(userId: number): Observable<IComunidad[]> | null {
    return this.http.get<IComunidad[]>(`${environment.apiUrl}/jugadores/comunidades/${userId}`);
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

    return this.http.post(`${environment.apiUrl}/comunidades`, comunidad, { headers: headers });
  }
}
