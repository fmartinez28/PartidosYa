import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPartido } from 'src/interfaces/IPartido';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private httpClient: HttpClient) { }
  public getPartidos(): Observable<IPartido[]>{
    return this.httpClient.get<IPartido[]>(`${environment.apiUrl}/partidos`, {
      //headers: {"Authorization": "Bearer el token"},
    });
  }
}
