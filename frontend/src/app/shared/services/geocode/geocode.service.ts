import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  constructor(private client: HttpClient) {
  }
  private url: string = 'https://geocode.maps.co/';
  public fetchDataAsync(address: string) {
    return this.client.get(`${this.url}search?q=${address}`);
  }
}
