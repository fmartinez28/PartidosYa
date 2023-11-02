import { Component } from '@angular/core';
import { GeocodeService } from 'src/app/shared/services/geocode/geocode.service';	
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  public name: string = '';
  public lastname: string = '';
  public email: string = '';
  public password: string = '';
  public birthdate: string = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;
  public address: string = '';
  /**
   *
   */

  ngOnInit(): void {
    this.titleService.setTitle('Signup');
  }

  constructor(private geocodeService: GeocodeService, private titleService: Title) {
  }

  public role: 'Jugador' | 'Propietario' = 'Jugador';
  public signup(): void {
    console.log('signup');
    console.log(`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`);
    let apiData;
    const addr = this.geocodeService.fetchDataAsync(this.address).subscribe(data => {
      apiData = data;
      console.log(data);
    });
  }
}
