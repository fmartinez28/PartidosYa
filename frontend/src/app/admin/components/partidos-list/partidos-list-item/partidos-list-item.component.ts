import { Component, Input } from '@angular/core';
import { IPartido } from 'src/app/admin/interfaces/IPartido';

@Component({
  selector: 'app-partidos-list-item',
  templateUrl: './partidos-list-item.component.html',
  styleUrls: ['./partidos-list-item.component.scss']
})
export class AdminPartidosListItemComponent {
  @Input()
  public partido!: IPartido;

  ngOnInit(): void {
    if (!this.partido) throw new Error('Partido is required');
  }

}
