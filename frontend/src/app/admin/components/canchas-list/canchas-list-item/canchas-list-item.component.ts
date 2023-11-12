import { Component, Input, OnInit } from '@angular/core';
import { ICancha } from 'src/app/admin/interfaces/ICancha';

@Component({
  selector: 'app-canchas-list-item',
  templateUrl: './canchas-list-item.component.html',
  styleUrls: ['./canchas-list-item.component.scss']
})
export class CanchasListItemComponent implements OnInit {

  @Input()
  public cancha!: ICancha;

  ngOnInit(): void {
    if (!this.cancha) throw new Error('Cancha is required');
  }
}
