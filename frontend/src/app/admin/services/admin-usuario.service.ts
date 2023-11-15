import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { IUsuario } from '../../../interfaces/IUsuario';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  private _usuarios: IUsuario[] = [];

  private cachedSearch: IUsuario[] = [];

  getUsuarios(): Observable<IUsuario[]> {
    const res = this.http.get<IUsuario[]>(`${environment.apiUrl}/usuarios`);
    res.subscribe(usuarios => this._usuarios = usuarios);
    return res;
  }

  getUsuario(id: number): Observable<IUsuario> | undefined {
    return this.http.get<IUsuario>(`${environment.apiUrl}/usuarios/${id}`);
  }

  deleteUsuario(id: number): Observable<IUsuario> {
    return this.http.delete<IUsuario>(`${environment.apiUrl}/usuarios/${id}`);
  }

  searchUsuarios(term: string): Observable<IUsuario[]> {
    if (!term.trim()) {
      this.cachedSearch = this._usuarios;
    } else {
      const filteredUsuarios = this._usuarios.filter(usuario => usuario.nombre.toLowerCase().includes(term.toLowerCase()));
      if (filteredUsuarios.length) {
        this.cachedSearch = filteredUsuarios;
      }
    }
    return of(this.cachedSearch);
  }

}
