import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/session/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(private authService: AuthService) {
  }
  isLoggedIn$!: Observable<boolean>;
  username?: string;
  pictureurl = 'https://picsum.photos/200/300';
  ngOnInit(){
    this.isLoggedIn$ = this.authService.loggedIn$;
  }
  public getUsername(){
    return JSON.parse(localStorage.getItem('user')!).username;
  }
  public onLogout(){
    this.authService.onLogout();
  }
}
