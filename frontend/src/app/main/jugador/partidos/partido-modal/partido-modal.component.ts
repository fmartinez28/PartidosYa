import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICancha } from 'src/interfaces/ICancha';
import { IPartido } from 'src/interfaces/IPartido';
import { IAddress } from '../../../../../interfaces/IAddress';
import { PartidosService } from '../services/partidos.service';
import { ComunidadesService } from '../../comunidades/services/comunidades.service';
import { CanchasService } from '../services/canchas.service';
import { AddressService } from '../services/address.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-partido-modal',
  templateUrl: './partido-modal.component.html',
  styleUrls: ['./partido-modal.component.scss']
})
export class PartidoModalComponent {
  @Input() public partidoid!: number;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  public direccionInfo!: IAddress;
  public canchaInfo!: ICancha;
  public partidoInfo!: IPartido;
  constructor(
    private partidosService: PartidosService,
    private comunidadService: ComunidadesService,
    private canchaService: CanchasService,
    private addressService: AddressService
  ){
  }
  ngOnInit(){
    this.fetchAllData();
  }

  private fetchAllData(){
    this.fetchPartidoInfo().pipe(
      switchMap(() => this.fetchCanchaInfo()),
      switchMap(() => this.fetchAddressInfo())
    ).subscribe(() => {
    });
  }

  private fetchPartidoInfo(){
    return this.partidosService.getPartido(this.partidoid).pipe(
      tap(res => {
        console.log(res);
        this.partidoInfo = res;
      })
    );
  }

  private fetchCanchaInfo(){
    return this.canchaService.getCancha(this.partidoInfo.canchaid).pipe(
      tap(res =>{
        console.log(res);
        this.canchaInfo = res;
      })
    );
  }

  private fetchAddressInfo(){
    return this.addressService.getAddress(this.canchaInfo.direccionid).pipe(
      tap(res => {
        console.log(res);
        this.direccionInfo = res;
      })
    );
  }
  public closeModalEventGenerator(){
    this.closeModal.emit();
  }
}
