import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IComunidad } from 'src/interfaces/IComunidad';
import { ComunidadesService } from '../../../services/comunidades.service';

@Component({
  selector: 'app-comunidades-list-item',
  templateUrl: './comunidades-list-item.component.html',
  styleUrls: ['./comunidades-list-item.component.scss']
})
export class ComunidadesListItemComponent implements OnInit {
  @Input()
  public comunidad!: IComunidad;

  @Input()
  public joinComunidad!: boolean;

  private routerLink: string = "/player/comunidades";
  constructor(private comunidadesService: ComunidadesService,
    private router: Router) {

  }

  ngOnInit(): void {
    if (!this.comunidad) throw new Error('Comunidad is required');
  }

  joinToComunidad(): void {
    this.comunidadesService.joinToComunidad(this.comunidad.id).subscribe({
      next: res => {
        console.log({ comunidades: res });
      },
      complete: () => {
        console.log({ result: "OK" })
        this.router.navigate([this.routerLink]);
      },
      error: err => {
        console.log({ error: err })
        this.router.navigate([this.routerLink]);
      }
    });
  }
}
