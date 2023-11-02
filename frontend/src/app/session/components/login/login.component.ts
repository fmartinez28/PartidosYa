import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private titleService: Title, private formBuilder: FormBuilder) {
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
      console.log("value", this.loginForm.value);

    } else {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
