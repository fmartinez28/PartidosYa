import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISignupRequest } from '../../../interfaces/ISignupRequest';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddress } from 'src/interfaces/IAddress';
import { IPhone } from 'src/interfaces/IPhone';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private httpClient: HttpClient) { }
  //Falta fixear lo de abajo (tiran un Observable<void>, que no deberia ser), me duermo
  public onAddressRegister(address: IAddress): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiUrl}/direcciones`, { address });
  }
  public onPhoneRegister(phone: IPhone): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiUrl}/telefonos`, { phone });
  }
  public onSignup(signupReq: ISignupRequest): Observable<any> {
    //TODO: Por ahora telefonoid y direccionid usa los ya existentes, a fixear esto en los próximos días
    return this.httpClient.post<void>(`${environment.apiUrl}/usuarios`, signupReq);
  }
}
