import { Component, Input, OnInit } from '@angular/core';
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
}
