import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    //Por ahora dejo esto aca, hay que meterlo en un modulo aislado despues
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: '**', redirectTo: ''}
    ]),
    FormsModule
  ]
})
export class SessionModule { }
