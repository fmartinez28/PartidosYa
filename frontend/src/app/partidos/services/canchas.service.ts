import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICancha } from 'src/interfaces/ICancha';

@Injectable({
  providedIn: 'root'
})
export class CanchasService {

  constructor(private httpClient: HttpClient) { }
  public getMatchingCanchas(): Observable<ICancha[]>{
    return this.httpClient.get<ICancha[]>(`${environment.apiUrl}/canchas`);
  }
}
