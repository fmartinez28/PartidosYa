import { Component, inject } from '@angular/core';
import { ComunidadesService } from '../../services/comunidades.service';
import { IComunidad } from 'src/interfaces/IComunidad';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-comunidades-search',
  templateUrl: './comunidades-search.component.html',
  styleUrls: ['./comunidades-search.component.scss']
})
export class ComunidadesSearchComponent {
  comunidades: IComunidad[] | null = [];

  private searchFilter = new Subject<string>();

  private comunidadesService: ComunidadesService = inject(ComunidadesService);

  constructor() {
    this.comunidadesService.comunidadAgregada.subscribe(() => {
      this.getComunidades();
    });

    this.searchFilter.pipe(
      // wait 300ms after each keystroke before considering the filter
      debounceTime(300),

      // ignore new filter if same as previous filter
      distinctUntilChanged(),

      // switch to new search observable each time the filter changes
      switchMap((filter: string) => this.comunidadesService.searchComunidad(filter)),
    ).subscribe(comunidades => this.comunidades = comunidades);
  }

  ngOnInit(): void {
    this.getComunidades();
  }

  getComunidades(): void {
    this.comunidadesService.getComunidades().subscribe({
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
    if (filter != null) {
      this.searchFilter.next(filter);
    }
  }
}
