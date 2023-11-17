import {Component, OnInit} from '@angular/core';
import {IPartido} from "../../../../../interfaces/IPartido";
import {PartidosService} from "../../../jugador/partidos/services/partidos.service";
import {debounceTime, distinctUntilChanged, Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-propietario-partidos-list',
  templateUrl: './propietario-partidos-list.component.html',
  styleUrls: ['./propietario-partidos-list.component.scss']
})
export class PropietarioPartidosListComponent implements OnInit {
  partidos: IPartido[] = [];

  constructor(
    private partidosService: PartidosService
  ) {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.partidosService.searchPartido(term)),
    ).subscribe(partidos => this.partidos = partidos);
  }

  ngOnInit(): void {
    this.getPartidos();
  }

  getPartidos(): void {
    this.partidosService.getPartidos().subscribe(partidos => this.partidos = partidos);
  }

  deletePartido(id: number): void {
    this.partidosService.deletePartido(id).subscribe(() => this.getPartidos());
  }

  acceptPartido(id: number): void {
    this.partidosService.acceptPartido(id).subscribe(() => this.getPartidos());
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  private searchTerms = new Subject<string>();
}
