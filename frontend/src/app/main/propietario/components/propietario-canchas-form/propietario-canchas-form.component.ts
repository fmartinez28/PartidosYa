import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ICancha} from "src/interfaces/ICancha";
import {CanchasService} from "../../../jugador/partidos/services/canchas.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../session/services/auth.service";
import {IUsuario} from "../../../../../interfaces/IUsuario";
import {showAlert} from "../../../../../utils/utils";


@Component({
  selector: 'app-propietario-canchas-form',
  templateUrl: './propietario-canchas-form.component.html',
  styleUrls: ['./propietario-canchas-form.component.scss']
})
export class PropietarioCanchasFormComponent implements OnInit {
  public form!: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private canchasService: CanchasService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      canchaNum: ['', Validators.required]
    });
  }

  public createCancha() {
    if (!this.form.valid) {
      this.markFormGroupTouched(this.form);
      console.warn("Formulario no válido");
      return;
    }

    // TODO ESTO ES HORROROSO, LA INTERFAZ TAMBIEN, HICIMOS TODO FEO
    let propietariodireccionid = 1; // FIXME hardcodeado, no trae nada de la db, nunca termina lo del fetch
    let usuario: IUsuario;
    this.authService.fetchUser().subscribe(
      (res) => {
        usuario = res;
        if(usuario && usuario.direccionid) {
          propietariodireccionid = usuario.direccionid;
        }
      }
    )

    const cancha: ICancha = {
      nombre: this.form.get('nombre')!.value,
      direccionid: propietariodireccionid,
      propietarioid: this.authService.getUserId(),
      canchanum: this.form.get('canchaNum')!.value,
    };

    console.log(cancha);

    this.canchasService.addCancha(cancha).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.warn(err, "Probablemente un error de autorización"),
      complete: () => {
        showAlert("success", "Cancha creada exitosamente")
        this.router.navigate(['/owner/canchas']);
      }
    })
  }

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
