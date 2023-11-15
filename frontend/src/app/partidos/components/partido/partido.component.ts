import { Time } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.scss']
})
export class PartidoComponent {
  @Input() public id!: number;
  @Input() public playerCount!: number;
  @Input() public playerLimit!: number;
  @Input() public scheduledDate!: string;

  constructor(public router: Router){}
  //Esto quizá hacer primero un fetch de todos los partidos a los que el usuario pertenece primero
  @Input() public playerHasJoined: boolean = false;
}
