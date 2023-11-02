import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    this.titleService.setTitle("Login");
  }

  constructor(private titleService:Title){
  }

  public username: string = "";
  public password: string = "";
  public signUpLink: string = "/signup";
  public login(): void {
    console.log(this.username);
    console.log(this.password);
  }
}
