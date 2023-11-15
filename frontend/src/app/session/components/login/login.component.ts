import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginRequest } from '../../../../interfaces/ILoginRequest';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string = "";
  public password: string = "";
  public signUpLink: string = "/session/signup";
  public loginForm!: FormGroup;

  get title() {
    return this.titleService.getTitle();
  }

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("Inicio de Sesión");

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onLogin(): void {
    if (this.loginForm.valid) {
      const loginReq: ILoginRequest = this.loginForm.value;
      this.authService.onLogin(loginReq).subscribe({
        next: res => {
          console.log(res);
          this.authService.saveUser(res);
        },
        complete: () => {
          console.log('Login completado');
          if (this.authService.checkIfAdmin()) {
            this.router.navigate(['/admin']);
            return;
          } else if (this.authService.checkIfJugador()) {
            this.router.navigate(['/player/partidos']);
          } else {
            this.router.navigate(['/owner/canchas']);
          }
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
