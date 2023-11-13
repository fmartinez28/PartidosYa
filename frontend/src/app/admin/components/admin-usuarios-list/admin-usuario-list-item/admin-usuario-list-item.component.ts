import { Component, Input, OnInit } from '@angular/core';
import { IUsuario } from '../../../../../interfaces/IUsuario';

@Component({
  selector: 'app-admin-usuario-list-item',
  templateUrl: './admin-usuario-list-item.component.html',
  styleUrls: ['./admin-usuario-list-item.component.scss']
})
export class AdminUsuarioListItemComponent implements OnInit {

  @Input()
  public usuario!: IUsuario;

  ngOnInit(): void {
    if (!this.usuario) throw new Error('Usuario is required');
  }

  constructor() { }
}
