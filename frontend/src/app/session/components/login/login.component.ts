import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private titleService: Title, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("Login");

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.router.navigate(['/canchas']);
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
