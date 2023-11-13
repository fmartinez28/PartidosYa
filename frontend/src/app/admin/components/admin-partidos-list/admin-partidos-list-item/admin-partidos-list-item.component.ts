import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPartido } from 'src/interfaces/IPartido';

@Component({
  selector: 'app-admin-partidos-list-item',
  templateUrl: './admin-partidos-list-item.component.html',
  styleUrls: ['./admin-partidos-list-item.component.scss']
})
export class AdminPartidosListItemComponent {
  @Input()
  public partido!: IPartido;

  ngOnInit(): void {
    if (!this.partido) throw new Error('Partido is required');
  }

  @Output()
  public onDeletePartido: EventEmitter<number> = new EventEmitter<number>();

  deletePartido(): void {
    this.onDeletePartido.emit(this.partido.id);
  }

}
