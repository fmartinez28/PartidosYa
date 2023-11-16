import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICancha } from 'src/interfaces/ICancha';

@Component({
  selector: 'app-propietario-canchas-list-item',
  templateUrl: './propietario-canchas-list-item.component.html',
  styleUrls: ['./propietario-canchas-list-item.component.scss']
})
export class PropietarioCanchasListItemComponent {
  @Input()
  public cancha!: ICancha;

  ngOnInit(): void {
    if (!this.cancha) throw new Error('Cancha is required');
  }

  @Output()
  public onDeleteCancha: EventEmitter<number> = new EventEmitter<number>();

  deleteCancha(): void {
    this.onDeleteCancha.emit(this.cancha.id);
  }
}
