import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { SessionRoutingModule } from './session-routing.module';
import { SessionPageComponent } from './pages/session-page/session-page.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SessionPageComponent,
  ],
  imports: [
    CommonModule,
    SessionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SessionModule { }
