import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddress } from 'src/interfaces/IAddress';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }
  public getAddress(addressId: number): Observable<IAddress> {
    return this.httpClient.get<IAddress>(`${environment.apiUrl}/direcciones/${addressId}`);
  }
}
