import { Component, OnInit } from '@angular/core';
import { ICancha } from '../../../../interfaces/ICancha';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AdminCanchasService } from '../../services/admin-canchas.service';

@Component({
  selector: 'app-admin-canchas-list',
  templateUrl: './admin-canchas-list.component.html',
  styleUrls: ['./admin-canchas-list.component.scss']
})
export class AdminCanchasListComponent implements OnInit {
  canchas: ICancha[] = [];

  private searchTerms = new Subject<string>();

  constructor(
    private canchasService: AdminCanchasService
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
