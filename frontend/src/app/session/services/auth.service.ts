import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILoginResponse } from 'src/interfaces/ILoginResponse';
import { ILoginRequest } from 'src/interfaces/ILoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userKey: string = 'user';
  constructor(
    private httpClient: HttpClient
  ){}
  public saveUser(user: ILoginResponse): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
  public checkIfLoggedIn(): boolean {
    if (localStorage.getItem(this.userKey)) {
      return true;
    } else {
      return false;
    }
  }
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
