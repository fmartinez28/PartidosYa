import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { IUsuario } from '../../../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class AdminUsuarioService {

  constructor() { }

  private cachedSearch: IUsuario[] = [];

  getUsuarios(): Observable<IUsuario[]> {
    return of(this._usuarios);
  }

  getUsuario(id: number): Observable<IUsuario> | undefined {
    const usuario = this._usuarios.find(usuario => usuario.id === id);
    if (usuario) {
      return of(usuario);
    }
    return undefined;
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

  private _usuarios: IUsuario[] = [{
    id: 1,
    nombre: 'Juan',
    apellido: 'Perez',
    email: 'juan@test.com',
    username: 'test',
    rol: 'Jugador'
  },
  {
    id: 2,
    nombre: 'Maria',
    apellido: 'Gomez',
    email: 'maria@test.com',
    username: 'maria',
    rol: 'Jugador'
  },
  {
    id: 3,
    nombre: 'Pedro',
    apellido: 'Gonzalez',
    email: 'pedro@test.com',
    username: 'pedro',
    rol: 'Propietario'
  },];
}
