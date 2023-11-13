import { Time } from '@angular/common';
<<<<<<< HEAD
import { Component, Input } from '@angular/core';
=======
import { Component } from '@angular/core';
>>>>>>> c74da364edfc8ba97bb85d8d18e752b4459ebecc

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.scss']
})
export class PartidoComponent {
<<<<<<< HEAD
  @Input() public playerCount: number = 0;
  @Input() public playerLimit: number = 10;
  @Input() public scheduledDate?: Date = new Date(2023, 11, 22, 18, 15);

  constructor(){}
  @Input() public pitch: string = 'María Auxiliadora';
  //Esto quizá hacer primero un fetch de todos los partidos a los que el usuario pertenece primero
  @Input() public playerHasJoined: boolean = true;
  @Input() public community: string = 'PartidosYaTeam';
=======
  public playerCount: number = 0;
  public playerLimit: number = 10;
  public scheduledDate?: Date = new Date(2023, 11, 22, 18, 15);

  constructor(){}
  public pitch: string = 'María Auxiliadora';
  //Esto quizá hacer primero un fetch de todos los partidos a los que el usuario pertenece primero
  public playerHasJoined: boolean = true;
  public community: string = 'PartidosYaTeam';
>>>>>>> c74da364edfc8ba97bb85d8d18e752b4459ebecc
}
