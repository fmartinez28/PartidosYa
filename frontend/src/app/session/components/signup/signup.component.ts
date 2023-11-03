import { Component } from '@angular/core';
import { GeocodeService } from 'src/app/shared/services/geocode/geocode.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { ISignupRequest } from 'src/interfaces/ISignupRequest';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public signupForm!: FormGroup;

  constructor(
    private geocodeService: GeocodeService,
    private titleService: Title,
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService
    ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Registro');

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required],
      country: ['', Validators.required],
      department: ['', Validators.required],
      city: ['', Validators.required],
      address: [{ value: '', disabled: true }] // Se inicia en disabled ya que lo verificamos solo si el rol es de propietario
    });

    this.signupForm.get('role')?.valueChanges.subscribe(role => {
      if (role === 'Propietario') {
        this.signupForm.get('address')?.enable();
        this.signupForm.get('address')?.setValidators(Validators.required);
      } else {
        this.signupForm.get('address')?.disable();
        this.signupForm.get('address')?.clearValidators();
      }
      this.signupForm.get('address')?.updateValueAndValidity();
    });
  }

  public onSignup(): void {
    if (this.signupForm.valid) {
      const signupReq: ISignupRequest = {
        nombre: this.signupForm.get('name')!.value,
        apellido: this.signupForm.get('lastname')!.value,
        email: this.signupForm.get('email')!.value,
        fechanac: this.signupForm.get('birthdate')!.value,
        username: this.signupForm.get('username')!.value,
        password: this.signupForm.get('password')!.value,
        //Hardcodeados por ahora
        telefonoid: 1,
        direccionid: 1
      };
      this.registerService.onSignup(signupReq).subscribe((res) => {
        console.log(res);
      });
      this.router.navigate(['/login']);
    } else {
      // En caso de que el form no sea válido por x motivo
      // Se va a recorrer cada campo para buscar los errores y mostrarlo en caso de que exista
      // El onlySelf es para que no afecte "sub campos" del mismo
      Object.keys(this.signupForm.controls).forEach(field => {
        const control = this.signupForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
