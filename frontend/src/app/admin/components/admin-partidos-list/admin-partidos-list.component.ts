import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { IPartido } from '../../../../interfaces/IPartido';
import { AdminPartidosService } from '../../services/admin-partidos.service';

@Component({
  selector: 'app-admin-partidos-list',
  templateUrl: './admin-partidos-list.component.html',
  styleUrls: ['./admin-partidos-list.component.scss']
})
export class AdminPartidosListComponent {
  partidos: IPartido[] = [];

  private searchTerms = new Subject<string>();

  constructor(
    private PartidosService: AdminPartidosService
  ) {

    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.PartidosService.searchPartido(term)),
    ).subscribe(Partidos => this.partidos = Partidos);

  }

  ngOnInit(): void {
    this.getPartidos();
  }

  getPartidos(): void {
    this.PartidosService.getPartidos().subscribe(Partidos => this.partidos = Partidos);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
