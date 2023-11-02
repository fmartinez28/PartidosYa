import { Component } from '@angular/core';
import { GeocodeService } from 'src/app/shared/services/geocode/geocode.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private geocodeService: GeocodeService, private titleService: Title, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Signup');

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  public signup(): void {
    console.log('signup');
    console.log(`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`);
    let apiData;
    const addr = this.geocodeService.fetchDataAsync(this.address).subscribe(data => {
      apiData = data;
      console.log(data);
    });

    if (this.signupForm.valid) {
      console.log("value", this.signupForm.value);

    } else {
      Object.keys(this.signupForm.controls).forEach(field => {
        const control = this.signupForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
