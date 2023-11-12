import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-canchas-list-view',
  templateUrl: './canchas-list-view.component.html',
  styleUrls: ['./canchas-list-view.component.scss']
})
export class CanchasListViewComponent {
  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Canchas");
  }

  get title () {
    return this.titleService.getTitle();
  }
}
