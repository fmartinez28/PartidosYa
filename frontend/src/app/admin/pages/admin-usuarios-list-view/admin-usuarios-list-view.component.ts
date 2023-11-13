import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-usuarios-list-view',
  templateUrl: './admin-usuarios-list-view.component.html',
  styleUrls: ['./admin-usuarios-list-view.component.scss']
})
export class AdminUsuariosListViewComponent implements OnInit {
  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Usuarios");
  }

  get title() {
    return this.titleService.getTitle();
  }
}
