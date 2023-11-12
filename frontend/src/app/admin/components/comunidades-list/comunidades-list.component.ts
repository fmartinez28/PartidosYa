import { Component } from '@angular/core';
import { IComunidad } from '../../interfaces/IComunidad';
import { ComunidadesService } from '../../services/comunidades.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-comunidades-list',
  templateUrl: './comunidades-list.component.html',
  styleUrls: ['./comunidades-list.component.scss']
})
export class ComunidadesListComponent {
  comunidades: IComunidad[]  = [];

  private searchTerms = new Subject<string>();

  constructor(
    private comunidadesService: ComunidadesService
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

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
