import { Component, Input, OnInit } from '@angular/core';
import { IUsuario } from '../../../interfaces/IUsuario';

@Component({
  selector: 'app-usuario-list-item',
  templateUrl: './usuario-list-item.component.html',
  styleUrls: ['./usuario-list-item.component.scss']
})
export class AdminUsuarioListItemComponent implements OnInit {

  @Input()
  public usuario!: IUsuario;

  ngOnInit(): void {
    if (!this.usuario) throw new Error('Usuario is required');
  }

  constructor() { }
}
