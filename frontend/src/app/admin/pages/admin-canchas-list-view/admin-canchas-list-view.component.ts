import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-canchas-list-view',
  templateUrl: './admin-canchas-list-view.component.html',
  styleUrls: ['./admin-canchas-list-view.component.scss']
})
export class AdminCanchasListViewComponent {
  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Canchas");
  }

  get title() {
    return this.titleService.getTitle();
  }
}
