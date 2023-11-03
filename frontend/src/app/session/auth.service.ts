import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILoginResponse } from 'src/interfaces/ILoginResponse';
import { ILoginRequest } from '../../interfaces/ILoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient
  ){}
  public onLogin(loginReq: ILoginRequest): Observable<ILoginResponse>{
    return this.httpClient.post<ILoginResponse>(`${environment.apiUrl}/login`, loginReq).pipe(
      catchError((err) => {
        if (err.status === 401) {
          console.log('Error: Usuario no autorizado.')
        } else {
          console.error('Error: Intentelo de nuevo más tarde');
        }
        throw(err);
      })
    );
  }
}
