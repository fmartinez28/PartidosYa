import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICancha } from 'src/interfaces/ICancha';

@Component({
  selector: 'app-admin-canchas-list-item',
  templateUrl: './admin-canchas-list-item.component.html',
  styleUrls: ['./admin-canchas-list-item.component.scss']
})
export class AdminCanchasListItemComponent implements OnInit {

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
