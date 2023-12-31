import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILoginResponse } from 'src/interfaces/ILoginResponse';
import { ILoginRequest } from 'src/interfaces/ILoginRequest';
import {IUsuario} from "../../../interfaces/IUsuario";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userKey: string = 'user';
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkIfLoggedIn());
  public loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();
  constructor(
    private httpClient: HttpClient
  ) { }
  public saveUser(user: ILoginResponse): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.loggedInSubject.next(true);
  }
  public onLogout() {
    localStorage.removeItem(this.userKey);
    this.loggedInSubject.next(false);
  }
  public checkIfLoggedIn(): boolean {
    return !!localStorage.getItem(this.userKey);
  }

  public fetchUser(): Observable<IUsuario> {
    const usuario : Observable<IUsuario> = this.httpClient.get<IUsuario>(`${environment.apiUrl}/usuarios/${this.getUserId()}`);
    usuario.subscribe((user) => {
      console.log(user);
    });
    return usuario;
  }

  public getUserRole(): number {
    const user = this.getUser();
    if (user)
      return Number.parseInt(JSON.parse(user).rolid);
    return 0; // error
  }

  public checkIfAdmin(): boolean {
    const user = this.getUser();
    if (user) {
      return JSON.parse(user).rolid == '3';
    }
    return false;
  }

  public checkIfJugador(): boolean {
    const user = this.getUser();
    if (user) {
      return JSON.parse(user).rolid == '1';
    }
    return false;
  }

  public checkIfPropietario(): boolean {
    const user = this.getUser();
    if (user) {
      return JSON.parse(user).rolid == '2';
    }
    return false;
  }

  public getUser(): string | null {
    return localStorage.getItem(this.userKey);
  }

  public getUserId(): number {
    const user = this.getUser();
    if (user)
      return Number.parseInt(JSON.parse(user).id);
    return 0; // error
  }

  public onLogin(loginReq: ILoginRequest): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(`${environment.apiUrl}/login`, loginReq).pipe(
      catchError((err) => {
        if (err.status === 401) {
          console.log('Error: Usuario no autorizado.')
        } else {
          console.error('Error: Intentelo de nuevo más tarde');
        }
        throw (err);
      })
    );
  }
}
