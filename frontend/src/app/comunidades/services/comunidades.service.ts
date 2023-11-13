import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IComunidad } from 'src/interfaces/IComunidad';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComunidadesService {

  constructor(private http: HttpClient) { }

  getComunidades(userId: number): Observable<IComunidad[]> | null {
    return this.http.get<IComunidad[]>(`${environment.apiUrl}/jugadores/comunidades/${userId}`);
  }

  agregarComunidad(comunidad: IComunidad): Observable<any> {
    return this.http.post(`${environment.apiUrl}/comunidades`, comunidad);
  }
}
