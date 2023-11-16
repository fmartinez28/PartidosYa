import { Component } from '@angular/core';
import { ICancha } from 'src/interfaces/ICancha';
import { PropietarioCanchasService } from '../../services/propietario-canchas.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-propietario-canchas-list',
  templateUrl: './propietario-canchas-list.component.html',
  styleUrls: ['./propietario-canchas-list.component.scss']
})
export class PropietarioCanchasListComponent {
  canchas: ICancha[] = [];

  private searchTerms = new Subject<string>();

  constructor(
    private canchasService: PropietarioCanchasService
  ) {

    this.searchTerms.pipe(

      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.canchasService.searchCanchas(term)),
    ).subscribe(canchas => this.canchas = canchas);
  }

  ngOnInit(): void {
    this.getCanchas();
  }

  getCanchas(): void {
    this.canchasService.getCanchas().subscribe(canchas => this.canchas = canchas);
  }

  deleteCancha(id: number): void {
    this.canchasService.deleteCancha(id).subscribe(() => this.getCanchas());
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
