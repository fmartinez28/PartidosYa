import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public username: string = "";
  public password: string = "";
  public signUpLink: string = "/signup";
  public login(): void {
    console.log(this.username);
    console.log(this.password);
  }
}
