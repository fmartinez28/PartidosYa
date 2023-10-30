import { Component } from '@angular/core';
import { GeocodeService } from '../../services/geocode.service';

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
  constructor(private geocodeService: GeocodeService) {
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
