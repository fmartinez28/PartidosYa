import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ComunidadesService } from 'src/app/comunidades/services/comunidades.service';
import { IComunidad } from 'src/interfaces/IComunidad';

@Component({
  selector: 'app-comunidades-list-item',
  templateUrl: './comunidades-list-item.component.html',
  styleUrls: ['./comunidades-list-item.component.scss']
})
export class ComunidadesListItemComponent implements OnInit {
  @Input()
  public comunidad!: IComunidad;

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
        this.router.navigate(["/comunidades"]);
      },
      error: err => {
        console.log({ error: err })
        this.router.navigate(['/comunidades']);
      }
    });
  }
}
