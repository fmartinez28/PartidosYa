import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IComunidad } from 'src/interfaces/IComunidad';

@Component({
  selector: 'app-comunidades-list',
  templateUrl: './comunidades-list.component.html',
  styleUrls: ['./comunidades-list.component.scss']
})
export class ComunidadesListComponent {
  @Input()
  comunidades!: Observable<IComunidad[]> | null;

  constructor() { }
}