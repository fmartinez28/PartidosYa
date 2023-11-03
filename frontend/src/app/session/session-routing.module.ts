import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MainLayoutPageComponent } from '../shared/pages/main-layout-page/main-layout-page.component';
import { SessionPageComponent } from './pages/session-page/session-page.component';
import { isUserNotLogged } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: SessionPageComponent,
        children: [
            { path: 'login', component: LoginComponent, canMatch: [isUserNotLogged] },
            { path: 'signup', component: SignupComponent, canMatch: [isUserNotLogged] },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SessionRoutingModule { }

