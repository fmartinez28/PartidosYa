import { Time } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PartidosService } from '../../services/partidos.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthService } from 'src/app/session/services/auth.service';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.scss'],
  animations: [
    trigger('fadeOut', [
      state('void', style({ opacity: 1 })),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PartidoComponent {
  @Input() public id!: number;
  @Input() public playerCount!: number;
  @Input() public playerLimit!: number;
  @Input() public scheduledDate!: string;
  @Input() public creadorid!: number;
  @Input() public aprobado!: boolean;
  public showingModal: boolean = false;
  public visible: boolean = true;
  public ownMatch: boolean = false;
  public toggleModal(){
    this.showingModal = !this.showingModal;
  }
  public timestamptz!: Date;

  constructor(public router: Router,
    private partidosService: PartidosService,
    private auth: AuthService
    ){
    }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['scheduledDate']) {
      this.timestamptz = new Date(changes['scheduledDate'].currentValue);
    }

  }
  //Esto quizá hacer primero un fetch de todos los partidos a los que el usuario pertenece primero
  @Input() public playerHasJoined: boolean = false;

  public joinPartido(){
    this.partidosService.joinPartido(this.id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.warn(err);
      },
      complete: () => {
        console.info("Se ha unido al partido");
        this.toggleVisibility();
      }
    }
    );
  }
  public leavePartido(){
    this.partidosService.leavePartido(this.id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.warn(err);
      },
      complete: () => {
        console.info("Partido abandonado");
        this.toggleVisibility();
      }
    })
  }
  ngOnInit(){
    if(this.creadorid == this.auth.getUserId()){
      this.ownMatch = true;
    }
  }
  private toggleVisibility(){
    this.visible = !this.visible;
  }
  public deletePartido(){
    this.partidosService.deletePartido(this.id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.warn(err);
      },
      complete: () => {
        console.info("Partido eliminado");
        this.toggleVisibility();
        this.router.navigate(['/player/partidos']);
      }
    })
  }
}
