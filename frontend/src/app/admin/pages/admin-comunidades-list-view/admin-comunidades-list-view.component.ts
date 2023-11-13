import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-comunidades-list-view',
  templateUrl: './admin-comunidades-list-view.component.html',
  styleUrls: ['./admin-comunidades-list-view.component.scss']
})
export class AdminComunidadesListViewComponent {
  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Comunidades");
  }

  get title() {
    return this.titleService.getTitle();
  }
}
