import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgSelectOption } from '@angular/forms';
import { ICancha } from 'src/interfaces/ICancha';
import { CanchasService } from '../../services/canchas.service';
import { PartidosService } from '../../services/partidos.service';
import { IPartido } from 'src/interfaces/IPartido';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partido-form',
  templateUrl: './partido-form.component.html',
  styleUrls: ['./partido-form.component.scss']
})
export class PartidoFormComponent {
  public form!: FormGroup;
  public canchas!: ICancha[];
  constructor(public formBuilder: FormBuilder,
    private canchasService: CanchasService,
    private partidosService: PartidosService,
    private router: Router) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      fechaprogramada: ['', Validators.required],
      canchaid: ['', Validators.required]
    });
    this.canchasService.getMatchingCanchas().subscribe(
      {
        next: (res) => { this.canchas = res; }
      }
    )
  }
  public createMatch() {
    if (!this.form.valid) {
      this.markFormGroupTouched(this.form);
      console.warn("Formulario no válido");
      return;
    }
    console.log(new Date().toISOString());
    const partido: IPartido = {
      fechacreacion: new Date().toISOString(),
      fechaprogramada: this.form.get('fechaprogramada')!.value,
      canchaid: this.form.get('canchaid')!.value,
    };
    this.partidosService.addPartido(partido).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.warn(err, "Probablemente un error de autorización"),
      complete: () => {
        console.info("Se completó parece");
        this.router.navigate(['/partidos']);
      }
    })
  };
  public markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  public fieldHasErrors(field: string): boolean {
    return this.form.get(field)!.touched && this.form.get(field)!.invalid;
  }
}
