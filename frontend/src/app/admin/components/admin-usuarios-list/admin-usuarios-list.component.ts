import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuario } from '../../../../interfaces/IUsuario';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin-usuarios-list',
  templateUrl: './admin-usuarios-list.component.html',
  styleUrls: ['./admin-usuarios-list.component.scss']
})
export class AdminUsuariosListComponent implements OnInit {

  usuarios: IUsuario[] = [];

  private searchTerms = new Subject<string>();

  constructor(
    private usuarioService: UsuarioService
  ) {

    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.usuarioService.searchUsuarios(term)),
    ).subscribe(usuarios => this.usuarios = usuarios);

  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(usuarios => this.usuarios = usuarios);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
