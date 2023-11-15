import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IComunidad } from 'src/interfaces/IComunidad';
import { ComunidadesService } from '../../services/comunidades.service';

@Component({
  selector: 'app-comunidades-form',
  templateUrl: './comunidades-form.component.html',
  styleUrls: ['./comunidades-form.component.scss']
})
export class ComunidadesFormComponent {
  public nombre: string = "";
  public descripcion: string = "";
  public memberslimit: number = 50;
  public comunidadForm!: FormGroup;

  private routerLink: string = "/player/comunidades";
  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private router: Router,
    private comunidadesService: ComunidadesService
  ) {
  }

  get title() {
    return this.titleService.getTitle();
  }

  ngOnInit(): void {
    this.titleService.setTitle("Crea tu comunidad!");

    this.comunidadForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: [''],
      memberslimit: ['50', [Validators.min(1), Validators.max(50)]],
    });
  }

  onAdd(): void {
    if (this.comunidadForm.valid) {
      const comunidadRequest: IComunidad = this.comunidadForm.value;
      this.comunidadesService.addComunidad(comunidadRequest).subscribe({
        next: res => {
          console.log(res);
          let { id } = res
          this.comunidadesService.joinToComunidadAsModerador(id).subscribe({
            next: res => {
              console.log({ moderador: res });
            },
            complete: () => {
              console.log({ result: "OK" })
            },
            error: err => {
              console.log({ error: err })
              this.router.navigate([this.routerLink]);
            }
          });
          this.comunidadesService.joinToComunidad(id).subscribe({
            next: res => {
              console.log({ comunidades: res });
            },
            complete: () => {
              console.log({ result: "OK" })
            },
            error: err => {
              console.log({ error: err })
              this.router.navigate([this.routerLink]);
            }
          })
        },
        complete: () => {
          this.comunidadesService.notificarComunidadAgregada();
          this.router.navigate([this.routerLink]);
        },
        error: err => {
          alert('Ocurrió un error ' + err);
          this.router.navigate([this.routerLink]);
        }
      });
    } else {
      Object.keys(this.comunidadForm.controls).forEach(field => {
        const control = this.comunidadForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
