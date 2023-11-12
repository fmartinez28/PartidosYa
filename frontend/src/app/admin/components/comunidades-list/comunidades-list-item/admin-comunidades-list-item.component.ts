import { Component, Input, OnInit } from '@angular/core';
import { IComunidad } from 'src/app/admin/interfaces/IComunidad';

@Component({
  selector: 'app-admin-comunidades-list-item',
  templateUrl: './admin-comunidades-list-item.component.html',
  styleUrls: ['./admin-comunidades-list-item.component.scss']
})
export class AdminComunidadesListItemComponent implements OnInit {

  @Input()
  public comunidad!: IComunidad;

  ngOnInit(): void {
    if (!this.comunidad) throw new Error('Comunidad is required');
  }
}
