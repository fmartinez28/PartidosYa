import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PartidosService } from '../../services/partidos.service';
import { IPartido } from 'src/interfaces/IPartido';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss']
})
export class PartidosComponent {
  @Input() public partidos!: IPartido[];
  @Input() public partidosState!: boolean;
  constructor(private titleService: Title) {
    this.titleService.setTitle('Partidos');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
