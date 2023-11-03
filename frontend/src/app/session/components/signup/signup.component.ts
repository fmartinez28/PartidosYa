import { Component } from '@angular/core';
import { GeocodeService } from 'src/app/shared/services/geocode/geocode.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  public name: string = '';
  public lastname: string = '';
  public email: string = '';
  public password: string = '';
  public birthdate: string = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;
  public address: string = '';
  public role: 'Jugador' | 'Propietario' = 'Jugador';
  public signupForm!: FormGroup;

  constructor(private geocodeService: GeocodeService, private titleService: Title, private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Signup');

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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

  public signup(): void {
    console.log('signup');
    console.log(`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`);
    let apiData;
    const addr = this.geocodeService.fetchDataAsync(this.address).subscribe(data => {
      apiData = data;
      console.log("address data", data);
    });

    if (this.signupForm.valid) {
      this.router.navigate(['/canchas']);
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
