import { Component, Input, OnInit } from '@angular/core';
import { IComunidadUser } from 'src/interfaces/IComunidadUser';

@Component({
  selector: 'app-comunidades-usuario-list-item',
  templateUrl: './comunidades-usuario-list-item.component.html',
  styleUrls: ['./comunidades-usuario-list-item.component.scss']
})
export class ComunidadesUsuarioListItemComponent implements OnInit {
  @Input()
  public usuario!: IComunidadUser;

  constructor() { }

  ngOnInit(): void {
    if (!this.usuario) throw new Error('Jugador is required');
  }
}
