import { Component, EventEmitter, Output } from '@angular/core';
import { IComunidad } from '../../../../interfaces/IComunidad';
import { AdminComunidadesService } from '../../services/admin-comunidades.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin-comunidades-list',
  templateUrl: './admin-comunidades-list.component.html',
  styleUrls: ['./admin-comunidades-list.component.scss']
})
export class AdminComunidadesListComponent {
  comunidades: IComunidad[] = [];

  private searchTerms = new Subject<string>();

  constructor(
    private comunidadesService: AdminComunidadesService
  ) {

    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.comunidadesService.searchComunidad(term)),
    ).subscribe(comunidades => this.comunidades = comunidades);

  }

  ngOnInit(): void {
    this.getComunidades();
  }

  getComunidades(): void {
    this.comunidadesService.getComunidades().subscribe(comunidades => this.comunidades = comunidades);
  }

  deleteComunidad(id: number): void {
    this.comunidadesService.deleteComunidad(id).subscribe(() => this.getComunidades());
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
