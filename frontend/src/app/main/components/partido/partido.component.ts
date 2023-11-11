import { Time } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.scss']
})
export class PartidoComponent {
  public playerCount: number = 0;
  public playerLimit: number = 10;
  public scheduledDate?: Date = new Date(2023, 11, 22, 18, 15);

  constructor(){}
  public pitch: string = 'María Auxiliadora';
  //Esto quizá hacer primero un fetch de todos los partidos a los que el usuario pertenece primero
  public playerHasJoined: boolean = true;
  public community: string = 'PartidosYaTeam';
}
