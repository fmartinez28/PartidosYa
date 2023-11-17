import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IPartido} from "../../../../../../interfaces/IPartido";

@Component({
  selector: 'app-propietario-partidos-list-item',
  templateUrl: './propietario-partidos-list-item.component.html',
  styleUrls: ['./propietario-partidos-list-item.component.scss']
})
export class PropietarioPartidosListItemComponent {
  @Input()
  public partido!: IPartido;

  ngOnInit(): void {
    if (!this.partido) throw new Error('Partido is required');
  }

  @Output()
  public onDeletePartido: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public onAcceptPartido: EventEmitter<number> = new EventEmitter<number>();

  deletePartido(): void {
    this.onDeletePartido.emit(this.partido.id);
  }

  acceptPartido(): void {
    this.onAcceptPartido.emit(this.partido.id)
  }

}
