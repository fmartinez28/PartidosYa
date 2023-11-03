import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILoginResponse } from 'src/interfaces/ILoginResponse';
import { ILoginRequest } from 'src/interfaces/ILoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userKey: string = 'user';
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkIfLoggedIn());
  public loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();
  constructor(
    private httpClient: HttpClient
  ){}
  public saveUser(user: ILoginResponse): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.loggedInSubject.next(true);
  }
  public onLogout(){
    localStorage.removeItem(this.userKey);
    this.loggedInSubject.next(false);
  }
  public checkIfLoggedIn(): boolean {
    return !!localStorage.getItem(this.userKey);
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
