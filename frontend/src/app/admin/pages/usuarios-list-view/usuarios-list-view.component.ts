import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-usuarios-list-view',
  templateUrl: './usuarios-list-view.component.html',
  styleUrls: ['./usuarios-list-view.component.scss']
})
export class UsuariosListViewComponent implements OnInit{
  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Usuarios");
  }

  get title () {
    return this.titleService.getTitle();
  }
}
