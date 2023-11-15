import { Component, inject } from '@angular/core';
import { IComunidad } from 'src/interfaces/IComunidad';
import { ComunidadesService } from '../../services/comunidades.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-comunidades-list',
  templateUrl: './comunidades-list.component.html',
  styleUrls: ['./comunidades-list.component.scss']
})
export class ComunidadesListComponent {
  comunidades: IComunidad[] = [];

  private searchFilter = new Subject<string>();
  private comunidadesService: ComunidadesService = inject(ComunidadesService);

  constructor() {
    this.comunidadesService.comunidadAgregada.subscribe(() => {
      this.getComunidades();
    });

    this.searchFilter.pipe(
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
    this.comunidadesService.getComunidadesByUserID().subscribe({
      next: comunidades => {
        this.comunidades = comunidades;
      },
      complete: () => {
        console.log({ result: 'OK' })
      },
      error: err => {
        console.error(err);
      }
    });
  }

  search(filter: string): void {
    console.log("comunidades en el list", this.comunidades)
    if (filter != null) {
      this.searchFilter.next(filter);
    }
  }
}