import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ILoginRequest } from '../../../../interfaces/ILoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string = "";
  public password: string = "";
  public signUpLink: string = "/signup";
  public loginForm!: FormGroup;

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("Login");

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onLogin(): void {
    if (this.loginForm.valid) {
      const loginReq: ILoginRequest = this.loginForm.value;
      this.authService.onLogin(loginReq).subscribe({
        next: res => console.log(res),
        complete: () => {
          console.log('Login completado');
          this.router.navigate(['/canchas']);
        },
        error: err => {
          alert('Error en el login');
          console.log('Ocurrió un error con el login:', err)
        }
      }
      );
    } else {
      // En caso de que el form no sea válido por x motivo
      // Se va a recorrer cada campo para buscar los errores y mostrarlo en caso de que exista
      // El onlySelf es para que no afecte "sub campos" del mismo
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
