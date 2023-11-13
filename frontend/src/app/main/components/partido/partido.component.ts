import { Component } from '@angular/core';
>>>>>>> fe8e129 (setup partidos)

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.scss']
})
export class PartidoComponent {
  @Input() public playerCount: number = 0;
  @Input() public playerLimit: number = 10;
  @Input() public scheduledDate?: Date = new Date(2023, 11, 22, 18, 15);

  constructor(){}
  @Input() public pitch: string = 'María Auxiliadora';
  //Esto quizá hacer primero un fetch de todos los partidos a los que el usuario pertenece primero
  @Input() public playerHasJoined: boolean = true;
  @Input() public community: string = 'PartidosYaTeam';
}
