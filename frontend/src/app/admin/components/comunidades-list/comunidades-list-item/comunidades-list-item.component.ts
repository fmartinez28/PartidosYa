import { Component, Input, OnInit } from '@angular/core';
import { IComunidad } from 'src/app/admin/interfaces/IComunidad';

@Component({
  selector: 'app-comunidades-list-item',
  templateUrl: './comunidades-list-item.component.html',
  styleUrls: ['./comunidades-list-item.component.scss']
})
export class ComunidadesListItemComponent implements OnInit {

  @Input()
  public comunidad!: IComunidad;

  ngOnInit(): void {
    if (!this.comunidad) throw new Error('Comunidad is required');
  }
}
